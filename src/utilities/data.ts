// Define the type for a Note
interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
}

// Function to get initial data
const getInitialData = (): Note[] => [
  {
    id: "1",
    title: "Website Maintenance Schedule",
    body: "Routine maintenance includes updating plugins, checking server logs, and ensuring website uptime. Monthly security checks are performed to mitigate potential vulnerabilities.",
    createdAt: '2024-09-01T10:15:00.000Z',
    archived: false,
  },
  {
    id: "2",
    title: "System Monitoring Tools",
    body: "We use monitoring tools such as Zabbix and Grafana to track server performance, network traffic, and application uptime. Alerts are set to notify of any abnormal activity.",
    createdAt: '2024-09-02T12:45:00.000Z',
    archived: false,
  },
  {
    id: "3",
    title: "CMS Plugin Update",
    body: "The WordPress-based company blog requires regular plugin updates. Ensure compatibility checks are done before updating to prevent site crashes.",
    createdAt: '2024-09-03T08:30:00.000Z',
    archived: false,
  },
  {
    id: "4",
    title: "SSL Certificate Renewal",
    body: "SSL certificates for all websites are set to expire in three months. Coordinate with the security team to renew them before the deadline to avoid service disruption.",
    createdAt: '2024-09-04T09:00:00.000Z',
    archived: false,
  },
  {
    id: "5",
    title: "Database Backup Schedule",
    body: "Automated backups are scheduled daily for the customer and product databases. Full backups are done weekly with incremental backups every 6 hours.",
    createdAt: '2024-09-05T14:20:00.000Z',
    archived: false,
  },
  {
    id: "6",
    title: "Website SEO Audit",
    body: "Monthly SEO audits are essential to ensure our website ranks well in search engines. The audit includes reviewing metadata, image alt texts, and overall site performance.",
    createdAt: '2024-09-06T11:40:00.000Z',
    archived: true,
  },
  {
    id: "7",
    title: "Server Patching",
    body: "Monthly server patching is scheduled for all production environments to address security vulnerabilities. Coordinate with the hosting provider for minimal downtime.",
    createdAt: '2024-09-07T15:10:00.000Z',
    archived: false,
  },
  {
    id: "8",
    title: "User Access Review",
    body: "Quarterly review of user access privileges is required to ensure that no unauthorized individuals have access to sensitive company systems.",
    createdAt: '2024-09-08T13:50:00.000Z',
    archived: false,
  },
  {
    id: "9",
    title: "Content Update Workflow",
    body: "Implementing a workflow for content updates on the website involves setting up approval processes with the marketing team and ensuring compliance with brand guidelines.",
    createdAt: '2024-09-09T17:00:00.000Z',
    archived: true,
  },
];

// Function to format the date
const showFormattedDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return new Date(date).toLocaleDateString("id-ID", options);
}

export { getInitialData, showFormattedDate };
