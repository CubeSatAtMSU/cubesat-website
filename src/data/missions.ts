// Mission pool — maps to a Payload "Collection"
// Each mission has card data (for carousel/grid) and full page data (for the mission detail page)
// To add a new mission: add an entry here. The dynamic [slug] route renders it automatically.

import type { MissionData } from "./types";

export const missions: MissionData[] = [
  {
    slug: "1-mississippi",
    card: {
      title: "1-Mississippi",
      description:
        "Launch and operate a 3U CubeSat with the primary objective of using remote sensing to identify environmental hazards, including wildfires, harmful algae, or gaseous emissions.",
      image: "/images/missions/1ms/prototype-exploded.jpg",
    },
    page: {
      hero: {
        title: "1-Mississippi",
        subtitle: "Mississippi\u2019s First Satellite Mission",
        missionStatement:
          "CubeSat at MSU will launch and operate a 3U CubeSat with the primary objective of using a cost effective remote sensing system to identify environmental hazards, including wildfires, harmful algae, or gaseous emissions. This will be Mississippi\u2019s first ever satellite.",
      },
      sections: [
        {
          type: "content",
          title: "Research Payload",
          subtitle: "Multispectral Imaging System",
          text: "1-MS will be equipped with a low-cost multispectral system for detecting environmental hazards. It will use three different wavelength bands in a small range and identify spikes caused by these hazards in the near infrared range.",
          media: {
            type: "carousel",
            contain: true,
            images: [
              { src: "/images/missions/1ms/filter-wheel.png", alt: "1-MS Filter Wheel Design" },
              { src: "/images/missions/1ms/payload-1.png", alt: "1-MS Payload" },
              { src: "/images/missions/1ms/payload-data.png", alt: "1-MS Payload Data" },
              { src: "/images/missions/1ms/prototype-exploded.jpg", alt: "1-MS Payload Prototype Exploded View" },
            ],
          },
          background: "gray",
        },
        {
          type: "content",
          title: "Launch Initiative",
          subtitle: "NASA ELaNa CubeSat Launch Initiative",
          text: "1-MS will be launched through the NASA ELaNa CubeSat Launch Initiative. The satellite will fit within their set criteria, including the size, weight, and useful payload to NASA missions.",
          link: {
            text: "Learn more about NASA ELaNa",
            href: "https://www.nasa.gov/cubesat-launch-initiative-introduction/",
          },
        },
        {
          type: "objectives",
          background: "gray",
          objectives: [
            {
              title: "Design & Construct the CubeSat",
              description:
                "Successfully design and construct the 3U CubeSat with operational instruments and the experimental payload",
            },
            {
              title: "Build the Ground Station",
              description:
                "Successfully design and construct a personal ground station on Mississippi State University\u2019s campus",
            },
            {
              title: "Comprehensive Testing",
              description:
                "Conduct significant and accurate testing of the structure and instruments onboard as well as the ground station",
            },
            {
              title: "NASA ELaNa Acceptance",
              description: "Be accepted by the NASA ELaNa launch initiative",
            },
            {
              title: "Launch into Orbit",
              description: "Successfully launch 1-Mississippi into orbit",
            },
            {
              title: "Establish Ground Contact",
              description:
                "Contact 1-Mississippi from the MSU ground station to send instructions and receive data from the systems and experimental payload",
            },
            {
              title: "Detect Environmental Hazards",
              description:
                "Locate environmental hazards using the near-infrared imaging payload",
            },
          ],
        },
        {
          type: "timeline",
          subtitle:
            "From development to launch: A comprehensive roadmap of the 1-Mississippi mission",
          items: [
            {
              year: "2025",
              season: "Fall",
              title: "Mission Development",
              description: "Initial mission planning and conceptual design phase",
            },
            {
              year: "2026",
              season: "Spring",
              title: "Vehicle/Payload Design",
              description:
                "Detailed design and research of satellite systems and payload",
            },
            {
              year: "2026",
              season: "Fall",
              title: "NASA Proposal Submission",
              description: "Submit launch proposal to NASA ELaNa initiative",
            },
            {
              year: "2027",
              season: "Spring & Fall",
              title: "Procurement and Construction",
              description:
                "Component procurement and satellite construction phase",
            },
            {
              year: "2028",
              season: "Spring & Fall",
              title: "Testing Phase",
              description:
                "Comprehensive testing of 1-Mississippi systems and ground station",
            },
            {
              year: "2029",
              season: "Spring",
              title: "Launch",
              description: "Launch of 1-Mississippi into orbit",
            },
          ],
        },
      ],
    },
  },

  {
    slug: "cape-4",
    card: {
      title: "CAPE-4 Collaboration",
      description:
        "Produce an operating communications payload (controlled and monitored at a ground station at MSU) for the University of Louisiana Lafayette CAPE-4 mission set to launch in 2025.",
      image: "/images/missions/cape4/teams.jpg",
    },
    page: {
      hero: {
        title: "CAPE-4 Collaboration",
        subtitle: "MSU and ULL Join Forces",
        missionStatement:
          "A collaborative payload mission aboard ULL\u2019s CAPE-4 satellite to test data transmission and ground station operations for CubeSat MSU\u2019s 1-MS Mission.",
      },
      sections: [
        {
          type: "content",
          title: "Experiment Description",
          subtitle: "Data Transfer Demonstration",
          text: [
            "The payload will be loaded with example images and data of equivalent or greater size than is expected from 1-Mississippi. For approximately a full week, the satellite will point at the MSU ground station during its daily ten-minute pass over the southeastern United States. During these passes, the pre-prepared images will be downloaded from the ground station and the quality will be analyzed.",
            "Data collected by CAPE-4\u2019s main payload will also be transmitted through CubeSat at MSU\u2019s experimental communications system.",
          ],
          media: {
            type: "image",
            images: [
              {
                src: "/images/missions/cape4/teams.jpg",
                alt: "CubeSat at MSU and ULL teams at SmallSat conference",
              },
            ],
          },
          background: "gray",
        },
        {
          type: "content",
          title: "Payload",
          subtitle: "Communications System",
          text: [
            "The payload centers on a Raspberry Pi computing system with a custom PCB connected via 40 header pins. It uses a LoRa SX1280 radio module transmitting at 2.4 GHz and includes voltage regulation circuitry for stable operation.",
            "The system connects to ULL\u2019s satellite bus via CANBus with a 5V power rail supplied by CAPE-4. All payload code is maintained in the club\u2019s GitHub repository.",
          ],
          media: {
            type: "carousel",
            contain: true,
            images: [
              {
                src: "/images/missions/cape4/noaa-data.png",
                alt: "NOAA satellite data collected during payload tests",
                caption: "NOAA data collected during ground station transmission tests",
              },
              {
                src: "/images/missions/cape4/payload-schematic.png",
                alt: "PELICAN payload circuit schematic",
                caption: "PELICAN payload schematic \u2014 LoRa interface, voltage regulation, and CAN bus",
              },
            ],
          },
          reverse: true,
        },
        {
          type: "content",
          title: "Ground Station",
          subtitle: "MSU Ground Station",
          text: [
            "The MSU ground station features a three-meter-tall ground antenna and dish operating in the S-band. The station will have approximately a ten-minute contact window with CAPE-4 during each pass over the southeastern United States.",
            "The final station location will be determined by small-scale radio interference tests conducted on campus to ensure optimal signal quality.",
          ],
          media: {
            type: "image",
            images: [
              {
                src: "/images/missions/cape4/ground-station.jpg",
                alt: "Prototype ground station antenna",
              },
            ],
          },
          background: "gray",
        },
        {
          type: "objectives",
          objectives: [
            {
              title: "Establish Satellite Contact",
              description:
                "Make strong, continual contact with the CAPE-4 satellite from the MSU ground station",
            },
            {
              title: "Confirm System Compatibility",
              description:
                "Confirm ground station and instrument compatibility with the CAPE-4 communications payload",
            },
            {
              title: "High Quality Data Transfer",
              description:
                "Receive high quality images within a single pass of the satellite over the southeastern United States",
            },
          ],
        },
        {
          type: "timeline",
          subtitle:
            "From design to delivery: the CAPE-4 payload and ground station development roadmap",
          items: [
            {
              year: "2025",
              season: "Spring",
              title: "Design Development & Review",
              description:
                "Payload circuit diagram, block diagram, link budget, and BOM design review. Ground station site surveys and final design development.",
            },
            {
              year: "2025",
              season: "Summer",
              title: "Procurement",
              description:
                "Component procurement for both payload and ground station systems",
            },
            {
              year: "2025",
              season: "Fall",
              title: "Payload Assembly & Delivery",
              description:
                "Assembly and testing of payload systems, deliver to University of Louisiana Lafayette for CAPE-4 integration",
            },
            {
              year: "2025",
              season: "Fall",
              title: "Ground Station Assembly & Testing",
              description:
                "Assembly and comprehensive testing of MSU ground station systems",
            },
          ],
        },
      ],
    },
  },

  {
    slug: "desperado",
    card: {
      title: "Desperado Missions",
      description:
        "Create a 1U CubeSat for real-world subsystem testing. Will launch on weather balloons, as the Space Cowboys rocketry payload at Spaceport America Cup, and as Xipiter MSU\u2019s UAS competition payload.",
      image: "/images/missions/desperado/cubesat-07.jpg",
    },
    page: {
      hero: {
        title: "Desperado Missions",
        subtitle: "Real-World Subsystem Testing",
        missionStatement:
          "The Desperado missions create a 1U CubeSat platform for real-world subsystem testing. These missions serve as a testbed for technologies that will fly on 1-Mississippi, launching on weather balloons, as the Space Cowboys rocketry payload at Spaceport America Cup, and as Xipiter MSU\u2019s UAS competition payload.",
      },
      sections: [],
    },
  },
];

// ——— Helper functions ———

/** Look up a mission by slug */
export function getMissionBySlug(slug: string): MissionData | undefined {
  return missions.find((m) => m.slug === slug);
}

/** Get all slugs (for generateStaticParams) */
export function getAllMissionSlugs(): string[] {
  return missions.map((m) => m.slug);
}

/**
 * Get featured missions in order for the homepage carousel.
 * Takes an array of slugs, returns the matching missions in that order.
 * Missions not found in the pool are silently skipped.
 */
export function getFeaturedMissions(slugs: string[]): MissionData[] {
  return slugs
    .map((slug) => missions.find((m) => m.slug === slug))
    .filter((m): m is MissionData => m !== undefined);
}
