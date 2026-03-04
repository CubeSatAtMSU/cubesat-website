/**
 * Seed script — populates MongoDB with all existing site data.
 * Run once with: npx tsx seed.ts
 *
 * Creates media entries (with local paths), missions, newsletters,
 * and populates the SiteConfig and Homepage globals.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

// Cache of path → media doc so we don't create duplicates
const mediaCache = new Map<string, any>()

async function createMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  url: string,
  alt: string,
  caption?: string,
) {
  if (mediaCache.has(url)) return mediaCache.get(url)
  const result = await payload.create({
    collection: 'media',
    data: { url, alt, ...(caption ? { caption } : {}) },
  })
  console.log(`  ✓ Media: ${url} → ID ${result.id}`)
  mediaCache.set(url, result)
  return result
}

// Build a Payload-compatible media block from image definitions
async function buildMediaBlock(
  payload: Awaited<ReturnType<typeof getPayload>>,
  block: { type: 'image' | 'carousel'; images: { src: string; alt: string; caption?: string }[]; contain?: boolean },
) {
  const imageRefs = []
  for (const img of block.images) {
    const media = await createMedia(payload, img.src, img.alt, img.caption)
    if (media) imageRefs.push({ image: media.id })
  }
  return {
    type: block.type,
    images: imageRefs,
    contain: block.contain || false,
  }
}

// ——— Main seed function ———

async function seed() {
  console.log('\n🚀 Starting seed...\n')

  const payload = await getPayload({ config })

  // Check if already seeded
  const existingMissions = await payload.find({ collection: 'missions', limit: 1 })
  if (existingMissions.totalDocs > 0) {
    console.log('⚠ Database already has data. Delete existing data first if you want to re-seed.')
    console.log('  Existing missions:', existingMissions.totalDocs)
    process.exit(0)
  }

  // ═══════════════════════════════════════════
  // STEP 0: Create admin user
  // ═══════════════════════════════════════════
  console.log('👤 Creating admin user...\n')

  const existingUsers = await payload.find({ collection: 'users', limit: 1 })
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: process.env.ADMIN_EMAIL || 'admin@cubesatmsu.com',
        password: process.env.ADMIN_PASSWORD || 'changeme123',
      },
    })
    console.log(`  ✓ Admin user created: ${process.env.ADMIN_EMAIL || 'admin@cubesatmsu.com'}`)
  } else {
    console.log('  ⏭ Admin user already exists, skipping')
  }

  // ═══════════════════════════════════════════
  // STEP 1: Create media entries (local paths)
  // ═══════════════════════════════════════════
  console.log('📸 Creating media entries...\n')

  // Home images
  await createMedia(payload, '/images/home/team-1.jpg', 'CubeSat at MSU team working')
  await createMedia(payload, '/images/home/team-2.jpg', 'CubeSat at MSU team')
  await createMedia(payload, '/images/home/team-3.jpg', 'CubeSat subteams working')
  await createMedia(payload, '/images/home/team-4.jpg', 'CubeSat at MSU team')

  // Mission: 1-Mississippi
  await createMedia(payload, '/images/missions/1ms/prototype-exploded.jpg', '1-MS Payload Prototype Exploded View')
  await createMedia(payload, '/images/missions/1ms/filter-wheel.png', '1-MS Filter Wheel Design')
  await createMedia(payload, '/images/missions/1ms/payload-1.png', '1-MS Payload')
  await createMedia(payload, '/images/missions/1ms/payload-data.png', '1-MS Payload Data')

  // Mission: CAPE-4
  await createMedia(payload, '/images/missions/cape4/teams.jpg', 'CubeSat at MSU and ULL teams at SmallSat conference')
  await createMedia(payload, '/images/missions/cape4/noaa-data.png', 'NOAA satellite data collected during payload tests', 'NOAA data collected during ground station transmission tests')
  await createMedia(payload, '/images/missions/cape4/payload-schematic.png', 'PELICAN payload circuit schematic', 'PELICAN payload schematic — LoRa interface, voltage regulation, and CAN bus')
  await createMedia(payload, '/images/missions/cape4/ground-station.jpg', 'Prototype ground station antenna')

  // Mission: Desperado
  await createMedia(payload, '/images/missions/desperado/cubesat-07.jpg', 'Desperado 1U CubeSat')

  // Community
  await createMedia(payload, '/images/community/k12/outreach-1.jpg', 'K-12 outreach event')
  await createMedia(payload, '/images/community/k12/outreach-2.jpg', 'Students learning about CubeSats')
  await createMedia(payload, '/images/community/k12/outreach-3.jpg', 'Community outreach')
  await createMedia(payload, '/images/community/k12/outreach-4.jpg', 'STEM education')
  await createMedia(payload, '/images/community/k12/outreach-5.png', 'K-12 outreach program')
  await createMedia(payload, '/images/community/engineering/aiaa.png', 'AIAA Student Conference')
  await createMedia(payload, '/images/community/engineering/ase.jpg', 'ASE Anniversary')
  await createMedia(payload, '/images/community/engineering/workshop.png', 'Instruments Workshop')
  await createMedia(payload, '/images/community/engineering/symposium.png', 'Research Symposium')

  // ═══════════════════════════════════════════
  // STEP 2: Create missions
  // ═══════════════════════════════════════════
  console.log('\n🛰 Creating missions...\n')

  // --- 1-Mississippi ---
  const ms1 = await payload.create({
    collection: 'missions',
    data: {
      title: '1-Mississippi',
      slug: '1-mississippi',
      description: 'Launch and operate a 3U CubeSat with the primary objective of using remote sensing to identify environmental hazards, including wildfires, harmful algae, or gaseous emissions.',
      cardImage: mediaCache.get('/images/missions/1ms/prototype-exploded.jpg')?.id,
      hero: {
        title: '1-Mississippi',
        subtitle: 'Mississippi\u2019s First Satellite Mission',
        missionStatement: 'CubeSat at MSU will launch and operate a 3U CubeSat with the primary objective of using a cost effective remote sensing system to identify environmental hazards, including wildfires, harmful algae, or gaseous emissions. This will be Mississippi\u2019s first ever satellite.',
      },
      sections: [
        {
          blockType: 'content',
          title: 'Research Payload',
          subtitle: 'Multispectral Imaging System',
          text: '1-MS will be equipped with a low-cost multispectral system for detecting environmental hazards. It will use three different wavelength bands in a small range and identify spikes caused by these hazards in the near infrared range.',
          media: await buildMediaBlock(payload, {
            type: 'carousel',
            contain: true,
            images: [
              { src: '/images/missions/1ms/filter-wheel.png', alt: '1-MS Filter Wheel Design' },
              { src: '/images/missions/1ms/payload-1.png', alt: '1-MS Payload' },
              { src: '/images/missions/1ms/payload-data.png', alt: '1-MS Payload Data' },
              { src: '/images/missions/1ms/prototype-exploded.jpg', alt: '1-MS Payload Prototype Exploded View' },
            ],
          }),
          background: 'gray',
        },
        {
          blockType: 'content',
          title: 'Launch Initiative',
          subtitle: 'NASA ELaNa CubeSat Launch Initiative',
          text: '1-MS will be launched through the NASA ELaNa CubeSat Launch Initiative. The satellite will fit within their set criteria, including the size, weight, and useful payload to NASA missions.',
          link: {
            text: 'Learn more about NASA ELaNa',
            href: 'https://www.nasa.gov/cubesat-launch-initiative-introduction/',
          },
        },
        {
          blockType: 'objectives',
          title: 'Mission Objectives',
          objectives: [
            { title: 'Design & Construct the CubeSat', description: 'Successfully design and construct the 3U CubeSat with operational instruments and the experimental payload' },
            { title: 'Build the Ground Station', description: 'Successfully design and construct a personal ground station on Mississippi State University\u2019s campus' },
            { title: 'Comprehensive Testing', description: 'Conduct significant and accurate testing of the structure and instruments onboard as well as the ground station' },
            { title: 'NASA ELaNa Acceptance', description: 'Be accepted by the NASA ELaNa launch initiative' },
            { title: 'Launch into Orbit', description: 'Successfully launch 1-Mississippi into orbit' },
            { title: 'Establish Ground Contact', description: 'Contact 1-Mississippi from the MSU ground station to send instructions and receive data from the systems and experimental payload' },
            { title: 'Detect Environmental Hazards', description: 'Locate environmental hazards using the near-infrared imaging payload' },
          ],
          background: 'gray',
        },
        {
          blockType: 'timeline',
          title: 'Mission Timeline',
          subtitle: 'From development to launch: A comprehensive roadmap of the 1-Mississippi mission',
          items: [
            { year: '2025', season: 'Fall', title: 'Mission Development', description: 'Initial mission planning and conceptual design phase' },
            { year: '2026', season: 'Spring', title: 'Vehicle/Payload Design', description: 'Detailed design and research of satellite systems and payload' },
            { year: '2026', season: 'Fall', title: 'NASA Proposal Submission', description: 'Submit launch proposal to NASA ELaNa initiative' },
            { year: '2027', season: 'Spring & Fall', title: 'Procurement and Construction', description: 'Component procurement and satellite construction phase' },
            { year: '2028', season: 'Spring & Fall', title: 'Testing Phase', description: 'Comprehensive testing of 1-Mississippi systems and ground station' },
            { year: '2029', season: 'Spring', title: 'Launch', description: 'Launch of 1-Mississippi into orbit' },
          ],
        },
      ],
    },
  })
  console.log(`  ✓ Created mission: ${ms1.title}`)

  // --- CAPE-4 ---
  const cape4 = await payload.create({
    collection: 'missions',
    data: {
      title: 'CAPE-4 Collaboration',
      slug: 'cape-4',
      description: 'Produce an operating communications payload (controlled and monitored at a ground station at MSU) for the University of Louisiana Lafayette CAPE-4 mission set to launch in 2025.',
      cardImage: mediaCache.get('/images/missions/cape4/teams.jpg')?.id,
      hero: {
        title: 'CAPE-4 Collaboration',
        subtitle: 'MSU and ULL Join Forces',
        missionStatement: 'A collaborative payload mission aboard ULL\u2019s CAPE-4 satellite to test data transmission and ground station operations for CubeSat MSU\u2019s 1-MS Mission.',
      },
      sections: [
        {
          blockType: 'content',
          title: 'Experiment Description',
          subtitle: 'Data Transfer Demonstration',
          text: 'The payload will be loaded with example images and data of equivalent or greater size than is expected from 1-Mississippi. For approximately a full week, the satellite will point at the MSU ground station during its daily ten-minute pass over the southeastern United States. During these passes, the pre-prepared images will be downloaded from the ground station and the quality will be analyzed.\n\nData collected by CAPE-4\u2019s main payload will also be transmitted through CubeSat at MSU\u2019s experimental communications system.',
          media: await buildMediaBlock(payload, {
            type: 'image',
            images: [{ src: '/images/missions/cape4/teams.jpg', alt: 'CubeSat at MSU and ULL teams at SmallSat conference' }],
          }),
          background: 'gray',
        },
        {
          blockType: 'content',
          title: 'Payload',
          subtitle: 'Communications System',
          text: 'The payload centers on a Raspberry Pi computing system with a custom PCB connected via 40 header pins. It uses a LoRa SX1280 radio module transmitting at 2.4 GHz and includes voltage regulation circuitry for stable operation.\n\nThe system connects to ULL\u2019s satellite bus via CANBus with a 5V power rail supplied by CAPE-4. All payload code is maintained in the club\u2019s GitHub repository.',
          media: await buildMediaBlock(payload, {
            type: 'carousel',
            contain: true,
            images: [
              { src: '/images/missions/cape4/noaa-data.png', alt: 'NOAA satellite data', caption: 'NOAA data collected during ground station transmission tests' },
              { src: '/images/missions/cape4/payload-schematic.png', alt: 'PELICAN payload circuit schematic', caption: 'PELICAN payload schematic — LoRa interface, voltage regulation, and CAN bus' },
            ],
          }),
          reverse: true,
        },
        {
          blockType: 'content',
          title: 'Ground Station',
          subtitle: 'MSU Ground Station',
          text: 'The MSU ground station features a three-meter-tall ground antenna and dish operating in the S-band. The station will have approximately a ten-minute contact window with CAPE-4 during each pass over the southeastern United States.\n\nThe final station location will be determined by small-scale radio interference tests conducted on campus to ensure optimal signal quality.',
          media: await buildMediaBlock(payload, {
            type: 'image',
            images: [{ src: '/images/missions/cape4/ground-station.jpg', alt: 'Prototype ground station antenna' }],
          }),
          background: 'gray',
        },
        {
          blockType: 'objectives',
          title: 'Mission Objectives',
          objectives: [
            { title: 'Establish Satellite Contact', description: 'Make strong, continual contact with the CAPE-4 satellite from the MSU ground station' },
            { title: 'Confirm System Compatibility', description: 'Confirm ground station and instrument compatibility with the CAPE-4 communications payload' },
            { title: 'High Quality Data Transfer', description: 'Receive high quality images within a single pass of the satellite over the southeastern United States' },
          ],
        },
        {
          blockType: 'timeline',
          title: 'Mission Timeline',
          subtitle: 'From design to delivery: the CAPE-4 payload and ground station development roadmap',
          items: [
            { year: '2025', season: 'Spring', title: 'Design Development & Review', description: 'Payload circuit diagram, block diagram, link budget, and BOM design review. Ground station site surveys and final design development.' },
            { year: '2025', season: 'Summer', title: 'Procurement', description: 'Component procurement for both payload and ground station systems' },
            { year: '2025', season: 'Fall', title: 'Payload Assembly & Delivery', description: 'Assembly and testing of payload systems, deliver to University of Louisiana Lafayette for CAPE-4 integration' },
            { year: '2025', season: 'Fall', title: 'Ground Station Assembly & Testing', description: 'Assembly and comprehensive testing of MSU ground station systems' },
          ],
        },
      ],
    },
  })
  console.log(`  ✓ Created mission: ${cape4.title}`)

  // --- Desperado ---
  const desperado = await payload.create({
    collection: 'missions',
    data: {
      title: 'Desperado Missions',
      slug: 'desperado',
      description: 'Create a 1U CubeSat for real-world subsystem testing. Will launch on weather balloons, as the Space Cowboys rocketry payload at Spaceport America Cup, and as Xipiter MSU\u2019s UAS competition payload.',
      cardImage: mediaCache.get('/images/missions/desperado/cubesat-07.jpg')?.id,
      hero: {
        title: 'Desperado Missions',
        subtitle: 'Real-World Subsystem Testing',
        missionStatement: 'The Desperado missions create a 1U CubeSat platform for real-world subsystem testing. These missions serve as a testbed for technologies that will fly on 1-Mississippi, launching on weather balloons, as the Space Cowboys rocketry payload at Spaceport America Cup, and as Xipiter MSU\u2019s UAS competition payload.',
      },
      sections: [],
    },
  })
  console.log(`  ✓ Created mission: ${desperado.title}`)

  // ═══════════════════════════════════════════
  // STEP 3: Create newsletters
  // ═══════════════════════════════════════════
  console.log('\n📰 Creating newsletters...\n')

  await payload.create({
    collection: 'newsletters',
    data: {
      title: 'Spring 2025 Newsletter',
      date: 'Spring 2025',
      year: '2025',
      description: 'Updates on CAPE-4 collaboration progress, spring recruitment results, and upcoming launch preparations.',
      href: '/newsletters/CubeSat Spring 2025 Newsletter (4).pdf',
    },
  })
  console.log('  ✓ Created: Spring 2025 Newsletter')

  await payload.create({
    collection: 'newsletters',
    data: {
      title: 'Fall 2024 Newsletter',
      date: 'Fall 2024',
      year: '2024',
      description: 'Recap of 1-Mississippi development milestones, new team members, and subteam highlights from the semester.',
      href: '/newsletters/CubeSat Fall 2024 Newsletter.pdf',
    },
  })
  console.log('  ✓ Created: Fall 2024 Newsletter')

  // ═══════════════════════════════════════════
  // STEP 4: Populate SiteConfig global
  // ═══════════════════════════════════════════
  console.log('\n⚙️ Setting Site Config...\n')

  await payload.updateGlobal({
    slug: 'site-config',
    data: {
      contacts: [
        { role: 'President', name: 'Sloan Berry', email: 'msb686@msstate.edu' },
        { role: 'Chief Engineer', name: 'Daniel Hurley', email: 'djh578@msstate.edu' },
        { role: 'MSU Advisor', name: 'Mr. Rob Wolz', email: 'rrw72@msstate.edu' },
      ],
      socialLinks: {
        github: 'https://github.com/CubeSatAtMSU',
        linkedin: 'https://www.linkedin.com/company/cubesat-msu/posts/?feedView=all',
        instagram: 'https://www.instagram.com/cubesat.at.msu/',
        cowbellConnect: 'https://msstate.campuslabs.com/engage/organization/cubesat_msu',
      },
      navLinks: [
        { label: 'Missions', href: '/missions', submenuType: 'missions' },
        { label: 'Newsletter', href: '/newsletters', submenuType: 'none' },
        { label: 'Contact', href: '#footer', submenuType: 'none' },
        { label: 'Join Us', href: 'https://msstate.campuslabs.com/engage/organization/cubesat_msu', submenuType: 'none' },
      ],
      footer: {
        contactQuestion: 'Have questions? Want to donate to CubeSat at MSU?',
        joinTitle: 'Join Our Team',
        joinDescription: 'Gain hands on experience and be part of aerospace innovation at MSU',
        joinLink: {
          text: 'Join on Cowbell Connect',
          href: 'https://msstate.campuslabs.com/engage/organization/cubesat_msu',
        },
        contactCallout: {
          text: 'Questions? Reach out to',
          name: 'Sloan Berry',
          email: 'msb686@msstate.edu',
        },
        newsletterTitle: 'Newsletter and Documentation',
        newsletterDescription: 'Stay updated with our latest progress',
      },
    },
  })
  console.log('  ✓ Site Config populated')

  // ═══════════════════════════════════════════
  // STEP 5: Populate Homepage global
  // ═══════════════════════════════════════════
  console.log('\n🏠 Setting Homepage...\n')

  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      hero: {
        title: 'Launching Mississippi Into Orbit',
        tagline: "Mississippi's First Student Satellite Team",
        backgroundImage: mediaCache.get('/images/home/team-4.jpg')?.id,
        buttons: [
          { text: 'Become a Sponsor', href: 'https://dda.msstate.edu/give-now?f=313064' },
          { text: 'Join Us', href: '#footer' },
        ],
      },
      about: {
        label: 'Student Team',
        title: 'CubeSat at MSU',
        text: [
          { paragraph: 'CubeSat at MSU is a student-led design team focused on designing, launching, and operating Mississippi\u2019s first satellite and developing other various missions.' },
          { paragraph: 'We are dedicated to providing an educational, hands-on experience for MSU students from all academic fields as well as providing outreach to our local community.' },
        ],
        media: await buildMediaBlock(payload, {
          type: 'image',
          images: [{ src: '/images/home/team-2.jpg', alt: 'CubeSat at MSU team' }],
        }),
      },
      subteams: {
        visible: true,
        label: 'Building Together',
        title: 'Our Subteams',
        items: [
          { name: 'Structures', description: 'Focus on the frame and manufacturing of the CubeSat' },
          { name: 'Instruments', description: 'Focus on ACDS, circuitry, and software of the satellite' },
          { name: 'GNC', description: 'Focused on guidance, navigation, and control of the satellite as well as operating the ground station' },
        ],
        media: await buildMediaBlock(payload, {
          type: 'image',
          images: [{ src: '/images/home/team-3.jpg', alt: 'CubeSat subteams working' }],
        }),
      },
      missions: {
        label: 'Our Missions',
        title: 'Our missions advance student expertise in aerospace and drive innovation across Mississippi\u2019s space industry.',
        featuredMissions: [ms1.id, cape4.id, desperado.id],
      },
      community: {
        label: 'Our Community',
        title: 'CubeSat at MSU is dedicated to serving our community and promoting a positive STEM experience in everything we do.',
        media: await buildMediaBlock(payload, {
          type: 'carousel',
          contain: true,
          images: [
            { src: '/images/community/k12/outreach-1.jpg', alt: 'K-12 outreach event' },
            { src: '/images/community/k12/outreach-2.jpg', alt: 'Students learning about CubeSats' },
            { src: '/images/community/k12/outreach-3.jpg', alt: 'Community outreach' },
            { src: '/images/community/k12/outreach-4.jpg', alt: 'STEM education' },
            { src: '/images/community/k12/outreach-5.png', alt: 'K-12 outreach program' },
            { src: '/images/community/engineering/aiaa.png', alt: 'AIAA Student Conference' },
            { src: '/images/community/engineering/ase.jpg', alt: 'ASE Anniversary' },
            { src: '/images/community/engineering/workshop.png', alt: 'Instruments Workshop' },
            { src: '/images/community/engineering/symposium.png', alt: 'Research Symposium' },
          ],
        }),
        outreach: [
          { title: 'K-12 outreach', description: 'Since our founding, CubeSat at MSU has participated in outreach to local elementary schools and provided a positive, fun academic experience to students. Our goal is to encourage students to shoot for the stars (literally) and stay curious as they grow up.' },
          { title: 'Engineering outreach', description: 'Our missions are a chance for MSU students to learn outside the classroom, apply their knowledge hands on, and make lifelong connections with other students, faculty, and industry leaders.' },
        ],
      },
      cta: {
        title: 'Support Innovation',
        description: 'Partner with CubeSat at MSU to launch Mississippi\u2019s first satellite and inspire the next generation of aerospace engineers. Your support enables groundbreaking student research and hands-on STEM education.',
        sponsorshipNote: 'Interested in sponsoring? Reach out to us via email and we\u2019ll share more about partnership opportunities.',
        primaryButton: { text: 'Become a Sponsor', href: 'https://dda.msstate.edu/give-now?f=313064' },
        secondaryButton: { text: 'Join Us', href: 'https://msstate.campuslabs.com/engage/organization/cubesat_msu' },
        media: await buildMediaBlock(payload, {
          type: 'image',
          images: [{ src: '/images/home/team-1.jpg', alt: 'CubeSat at MSU team working' }],
        }),
      },
    },
  })
  console.log('  ✓ Homepage populated')

  console.log('\n✅ Seed complete! All data is now in MongoDB.\n')
  console.log('Go to localhost:3000/admin to see everything in the admin panel.\n')
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
  })
