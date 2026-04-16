export interface ShipmentUpdate {
  location: string;
  status: "pending" | "in-transit" | "out-for-delivery" | "delivered";
  timestamp: string;
  notes: string;
}

export interface Shipment {
  id: string;
  customer: string;
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  origin: string;
  destination: string;
  weight: number;
  carrier: "economy" | "standard" | "express" | "premium";
  status: "pending" | "in-transit" | "out-for-delivery" | "delivered";
  createdDate: string;
  expectedDelivery: string;
  actualDelivery?: string;
  description: string;
  cost: number;
  updates: ShipmentUpdate[];
}

export const mockShipments: Shipment[] = [
  {
    id: "SHP-2024-001",
    customer: "Acme Industries",
    senderName: "John Smith",
    senderAddress: "1234 Business Ave, Los Angeles, CA 90001",
    senderPhone: "+1-310-555-0001",
    receiverName: "Sarah Johnson",
    receiverAddress: "5678 Manhattan St, New York, NY 10001",
    receiverPhone: "+1-212-555-0001",
    origin: "Los Angeles, CA",
    destination: "New York, NY",
    weight: 45,
    carrier: "express",
    status: "in-transit",
    createdDate: "2024-03-24",
    expectedDelivery: "2024-03-28",
    description: "Electronics shipment - 3 servers and networking equipment",
    cost: 245.0,
    updates: [
      {
        location: "Los Angeles, CA Distribution Center",
        status: "pending",
        timestamp: "2024-03-24 10:30 AM",
        notes: "Package received and scanned",
      },
      {
        location: "Phoenix, AZ Hub",
        status: "in-transit",
        timestamp: "2024-03-25 08:15 AM",
        notes: "In transit to next destination",
      },
      {
        location: "Denver, CO Transit Point",
        status: "in-transit",
        timestamp: "2024-03-26 04:45 PM",
        notes: "Package transferred to express route",
      },
      {
        location: "Chicago, IL Regional Hub",
        status: "in-transit",
        timestamp: "2024-03-27 06:20 AM",
        notes: "On final delivery route",
      },
    ],
  },
  {
    id: "SHP-2024-002",
    customer: "Tech Solutions Inc.",
    senderName: "Mike Chen",
    senderAddress: "9876 Tech Park, Chicago, IL 60601",
    senderPhone: "+1-312-555-0002",
    receiverName: "Emily Davis",
    receiverAddress: "2468 Liberty St, Boston, MA 02101",
    receiverPhone: "+1-617-555-0002",
    origin: "Chicago, IL",
    destination: "Boston, MA",
    weight: 28,
    carrier: "standard",
    status: "delivered",
    createdDate: "2024-03-23",
    expectedDelivery: "2024-03-26",
    actualDelivery: "2024-03-26",
    description: "Software licenses and documentation",
    cost: 135.0,
    updates: [
      {
        location: "Chicago, IL Distribution Center",
        status: "pending",
        timestamp: "2024-03-23 11:00 AM",
        notes: "Package received",
      },
      {
        location: "Indianapolis, IN Hub",
        status: "in-transit",
        timestamp: "2024-03-24 09:30 AM",
        notes: "Processing and routing",
      },
      {
        location: "Pittsburgh, PA Transit",
        status: "in-transit",
        timestamp: "2024-03-25 05:15 PM",
        notes: "In transit",
      },
      {
        location: "Boston, MA Distribution Center",
        status: "out-for-delivery",
        timestamp: "2024-03-26 08:00 AM",
        notes: "Out for delivery",
      },
      {
        location: "2468 Liberty St, Boston, MA 02101",
        status: "delivered",
        timestamp: "2024-03-26 02:45 PM",
        notes: "Delivered successfully",
      },
    ],
  },
  {
    id: "SHP-2024-003",
    customer: "Global Logistics",
    senderName: "Robert Wilson",
    senderAddress: "3456 Harbor Blvd, Seattle, WA 98101",
    senderPhone: "+1-206-555-0003",
    receiverName: "Patricia Brown",
    receiverAddress: "7890 Sunrise Ave, Miami, FL 33101",
    receiverPhone: "+1-305-555-0003",
    origin: "Seattle, WA",
    destination: "Miami, FL",
    weight: 62,
    carrier: "express",
    status: "pending",
    createdDate: "2024-03-22",
    expectedDelivery: "2024-03-30",
    description: "Industrial machinery and spare parts",
    cost: 385.0,
    updates: [
      {
        location: "Seattle, WA Distribution Center",
        status: "pending",
        timestamp: "2024-03-22 01:00 PM",
        notes: "Package received and labeled",
      },
    ],
  },
  {
    id: "SHP-2024-004",
    customer: "Enterprise Solutions",
    senderName: "David Martinez",
    senderAddress: "5678 Mountain View, Denver, CO 80202",
    senderPhone: "+1-303-555-0004",
    receiverName: "Jennifer Lee",
    receiverAddress: "1111 Market St, San Francisco, CA 94102",
    receiverPhone: "+1-415-555-0004",
    origin: "Denver, CO",
    destination: "San Francisco, CA",
    weight: 35,
    carrier: "economy",
    status: "out-for-delivery",
    createdDate: "2024-03-21",
    expectedDelivery: "2024-03-29",
    description: "Office furniture and fixtures",
    cost: 198.0,
    updates: [
      {
        location: "Denver, CO Distribution Center",
        status: "pending",
        timestamp: "2024-03-21 02:15 PM",
        notes: "Package accepted",
      },
      {
        location: "Salt Lake City, UT Hub",
        status: "in-transit",
        timestamp: "2024-03-23 10:45 AM",
        notes: "In transit",
      },
      {
        location: "Las Vegas, NV Transit Point",
        status: "in-transit",
        timestamp: "2024-03-24 03:30 PM",
        notes: "Transferred to local hub",
      },
      {
        location: "San Francisco, CA Distribution Center",
        status: "out-for-delivery",
        timestamp: "2024-03-27 07:00 AM",
        notes: "Out for delivery today",
      },
    ],
  },
  {
    id: "SHP-2024-005",
    customer: "StartUp Ventures",
    senderName: "Lisa Anderson",
    senderAddress: "2468 Innovation Drive, Austin, TX 78701",
    senderPhone: "+1-512-555-0005",
    receiverName: "Christopher Moore",
    receiverAddress: "3579 Forest Ave, Portland, OR 97201",
    receiverPhone: "+1-503-555-0005",
    origin: "Austin, TX",
    destination: "Portland, OR",
    weight: 22,
    carrier: "standard",
    status: "in-transit",
    createdDate: "2024-03-20",
    expectedDelivery: "2024-03-26",
    description: "Prototype devices and testing equipment",
    cost: 165.0,
    updates: [
      {
        location: "Austin, TX Distribution Center",
        status: "pending",
        timestamp: "2024-03-20 03:45 PM",
        notes: "Package received",
      },
      {
        location: "Dallas, TX Hub",
        status: "in-transit",
        timestamp: "2024-03-21 11:20 AM",
        notes: "Routing to next hub",
      },
      {
        location: "Oklahoma City, OK Transit",
        status: "in-transit",
        timestamp: "2024-03-22 06:00 PM",
        notes: "In transit",
      },
      {
        location: "Denver, CO Hub",
        status: "in-transit",
        timestamp: "2024-03-24 04:15 PM",
        notes: "At regional distribution center",
      },
    ],
  },
  {
    id: "SHP-2024-006",
    customer: "Global Trading Co.",
    senderName: "Thomas Garcia",
    senderAddress: "7890 Commerce St, Houston, TX 77001",
    senderPhone: "+1-713-555-0006",
    receiverName: "Angela Taylor",
    receiverAddress: "4321 Metroplex Dr, Dallas, TX 75201",
    receiverPhone: "+1-972-555-0006",
    origin: "Houston, TX",
    destination: "Dallas, TX",
    weight: 55,
    carrier: "express",
    status: "in-transit",
    createdDate: "2024-03-19",
    expectedDelivery: "2024-03-21",
    description: "Raw materials for manufacturing",
    cost: 425.0,
    updates: [
      {
        location: "Houston, TX Distribution Center",
        status: "pending",
        timestamp: "2024-03-19 09:00 AM",
        notes: "Package received and verified",
      },
      {
        location: "Beaumont, TX Sorting Facility",
        status: "in-transit",
        timestamp: "2024-03-19 04:30 PM",
        notes: "Sorted for express delivery",
      },
      {
        location: "Dallas, TX Distribution Center",
        status: "in-transit",
        timestamp: "2024-03-20 08:00 AM",
        notes: "In final delivery zone",
      },
    ],
  },
  {
    id: "SHP-2024-007",
    customer: "Logistics Partners",
    senderName: "Mark Thompson",
    senderAddress: "6543 Desert Way, Phoenix, AZ 85001",
    senderPhone: "+1-602-555-0007",
    receiverName: "Susan White",
    receiverAddress: "9876 Neon Blvd, Las Vegas, NV 89101",
    receiverPhone: "+1-702-555-0007",
    origin: "Phoenix, AZ",
    destination: "Las Vegas, NV",
    weight: 32,
    carrier: "standard",
    status: "delivered",
    createdDate: "2024-03-18",
    expectedDelivery: "2024-03-20",
    actualDelivery: "2024-03-20",
    description: "Consumer goods and retail items",
    cost: 289.0,
    updates: [
      {
        location: "Phoenix, AZ Distribution Center",
        status: "pending",
        timestamp: "2024-03-18 10:30 AM",
        notes: "Package received",
      },
      {
        location: "Flagstaff, AZ Transit Hub",
        status: "in-transit",
        timestamp: "2024-03-18 06:15 PM",
        notes: "In transit",
      },
      {
        location: "Las Vegas, NV Distribution Center",
        status: "out-for-delivery",
        timestamp: "2024-03-20 07:00 AM",
        notes: "Out for delivery",
      },
      {
        location: "9876 Neon Blvd, Las Vegas, NV 89101",
        status: "delivered",
        timestamp: "2024-03-20 11:30 AM",
        notes: "Delivered successfully. Signed by S. White",
      },
    ],
  },
  {
    id: "SHP-2024-008",
    customer: "Premium Goods LLC",
    senderName: "Jessica Harris",
    senderAddress: "2222 Fashion Pl, Los Angeles, CA 90210",
    senderPhone: "+1-310-555-0008",
    receiverName: "Daniel Rodriguez",
    receiverAddress: "5555 Fashion Ave, New York, NY 10018",
    receiverPhone: "+1-212-555-0008",
    origin: "Los Angeles, CA",
    destination: "New York, NY",
    weight: 18,
    carrier: "premium",
    status: "in-transit",
    createdDate: "2024-03-25",
    expectedDelivery: "2024-03-27",
    description: "Luxury fashion items and accessories",
    cost: 895.0,
    updates: [
      {
        location: "Los Angeles, CA - Premium Hub",
        status: "pending",
        timestamp: "2024-03-25 08:00 AM",
        notes: "Premium shipment received and insured",
      },
      {
        location: "Las Vegas, NV - Premium Transit",
        status: "in-transit",
        timestamp: "2024-03-25 06:00 PM",
        notes: "In transit with full tracking and insurance",
      },
      {
        location: "Denver, CO - Premium Hub",
        status: "in-transit",
        timestamp: "2024-03-26 08:30 AM",
        notes: "Secure transfer to next hub",
      },
    ],
  },
  {
    id: "SHP-2024-009",
    customer: "Tech Hardware Co.",
    senderName: "Kevin Brown",
    senderAddress: "8888 Silicon St, San Jose, CA 95110",
    senderPhone: "+1-408-555-0009",
    receiverName: "Michelle Taylor",
    receiverAddress: "6666 Bellway Rd, Seattle, WA 98101",
    receiverPhone: "+1-206-555-0009",
    origin: "San Jose, CA",
    destination: "Seattle, WA",
    weight: 42,
    carrier: "express",
    status: "delivered",
    createdDate: "2024-03-17",
    expectedDelivery: "2024-03-20",
    actualDelivery: "2024-03-20",
    description: "Computer components and peripherals",
    cost: 567.0,
    updates: [
      {
        location: "San Jose, CA Distribution Center",
        status: "pending",
        timestamp: "2024-03-17 12:00 PM",
        notes: "Package received",
      },
      {
        location: "Sacramento, CA Transit Hub",
        status: "in-transit",
        timestamp: "2024-03-17 08:00 PM",
        notes: "In transit on express route",
      },
      {
        location: "Portland, OR Distribution Hub",
        status: "in-transit",
        timestamp: "2024-03-18 04:00 PM",
        notes: "Transferred to regional hub",
      },
      {
        location: "Seattle, WA Distribution Center",
        status: "out-for-delivery",
        timestamp: "2024-03-19 09:00 AM",
        notes: "Out for delivery",
      },
      {
        location: "6666 Bellway Rd, Seattle, WA 98101",
        status: "delivered",
        timestamp: "2024-03-20 03:15 PM",
        notes: "Delivered and confirmed",
      },
    ],
  },
  {
    id: "SHP-2024-010",
    customer: "Manufacturing Direct",
    senderName: "James Wilson",
    senderAddress: "4444 Factory Way, Detroit, MI 48201",
    senderPhone: "+1-313-555-0010",
    receiverName: "Rebecca Smith",
    receiverAddress: "7777 Industrial Blvd, Cleveland, OH 44114",
    receiverPhone: "+1-216-555-0010",
    origin: "Detroit, MI",
    destination: "Cleveland, OH",
    weight: 78,
    carrier: "standard",
    status: "in-transit",
    createdDate: "2024-03-23",
    expectedDelivery: "2024-03-26",
    description: "Heavy manufacturing equipment",
    cost: 1245.0,
    updates: [
      {
        location: "Detroit, MI Distribution Center",
        status: "pending",
        timestamp: "2024-03-23 06:00 AM",
        notes: "Heavy package received and verified",
      },
      {
        location: "Ann Arbor, MI Transit Point",
        status: "in-transit",
        timestamp: "2024-03-23 03:00 PM",
        notes: "In transit",
      },
      {
        location: "Columbus, OH Hub",
        status: "in-transit",
        timestamp: "2024-03-24 08:00 PM",
        notes: "At regional distribution center",
      },
    ],
  },
];

export function getShipmentById(id: string): Shipment | undefined {
  return mockShipments.find((s) => s.id.toLowerCase() === id.toLowerCase());
}

export function searchShipments(query: string): Shipment[] {
  const lowerQuery = query.toLowerCase();
  return mockShipments.filter(
    (s) =>
      s.id.toLowerCase().includes(lowerQuery) ||
      s.customer.toLowerCase().includes(lowerQuery) ||
      s.senderName.toLowerCase().includes(lowerQuery) ||
      s.receiverName.toLowerCase().includes(lowerQuery),
  );
}
