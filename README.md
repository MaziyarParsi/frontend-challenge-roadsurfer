# Station Bookings Calendar

This is a React application that allows users to view and manage bookings for various stations. It features a responsive calendar interface where users can select a station and see its weekly booking schedule.

## Features

- **Station Search**: An autocomplete input to easily search and select a station.
- **Weekly Calendar View**: A clear and responsive weekly calendar that displays bookings for the selected station.
- **Booking Details**: Clicking on a booking opens a modal with more detailed information.
- **Responsive Design**: The application is designed to work seamlessly on both desktop and mobile devices.

## Technology Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query for server state management
- **Testing**: Vitest, React Testing Library
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (or npm/yarn)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MaziyarParsi/frontend-challenge-roadsurfer
    cd frontend-task-surfruner
    ```
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

### Running the Development Server

To start the local development server, run:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`.

## Running Tests

This project uses Vitest for unit and component testing. To run the tests, use the following command:

```bash
pnpm test
```
