# Project: TicketBari — Online Ticket Booking Platform

## Purpose:
    The purpose of TicketBari is to provide a convenient and user-friendly platform for discovering and booking Bus, Train, Launch, Plane, and other transportation tickets.
    The platform provides separate dashboards and functionalities for Users, Vendors, and Admins, making ticket management, booking, payment, and platform administration easier and more efficient.

## Live URL: https://ticket-bari-nine.vercel.app

## Key features:

    For Users:

       1. Browse admin-approved tickets.
       2. Search tickets by From → To locations.
       3. Filter tickets by transport type.
       4. Sort tickets by price.
       5. Departure countdown timer.
       6. Book tickets with quantity selection.
       7. Booking quantity validation based on available tickets.
       8. View booked tickets and booking status.
       9. Pay for accepted bookings using Stripe.
       10.Automatic ticket quantity reduction after successful payment.
       11.View transaction/payment history.
       12.User profile management.
       13.Dark/Light mode.


    For Admins:

        1. Manage all tickets.
        2. Approve or reject vendor tickets.
        3. Manage platform users.
        4. Change user roles between User, Vendor, and Admin.
        5. Mark vendors as fraudulent.
        6. Hide fraudulent vendors' tickets from the platform.
        7. Prevent fraudulent vendors from adding new tickets.
        8. Manage ticket advertisements.
        9. Revenue and platform statistics.

    For Vendors:

        1. Add new tickets.
        2. Manage added tickets.
        3. Update ticket information.
        4. Delete tickets.
        5. Receive booking requests.
        6. Accept or reject booking requests.
        7. Revenue overview

## Additional Features
    1. Pagination for ticket listings
    2. Loading spinners during data fetching
    3. Custom error/invalid route page
    4. Responsive dashboard
    5. Dark/Light theme
    6. Ticket search and filtering
    7. Price sorting
    8. Advertisement management
    9. Revenue analytics

## NPM Packages Used:
    1. Tailwind CSS
    2. Better Auth
    3. Hero UI
    4. Stripe
    5. Framer Motion
    6. Lucide React
    7. React Toastify
    8. React Icons
    9. Swiper
    10.Recharts
    11.Sweetalert2

## How to Run TicketBari Locally

    1. Make sure Node.js (v16+) and Git are installed
    2. Clone the repository:
        git clone https://github.com/Taukir30/ticket-bari-next.git
    3. Go to the project folder:
        cd ticket-bari-next
    4. Install dependencies:
        npm install
    5. Create a .env file if required and add environment variables (see .env.example)
    6. Start the development server:
        npm run dev
    7. Open your browser and visit:
        http://localhost:5173
