/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: "class",
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        firstInner:
          " url('https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        secondInner:
          "url('https://images.pexels.com/photos/1797415/pexels-photo-1797415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        third2:
          "url('https://www.zoho.com/inventory/images/common-dashboard-1x.png')",
        third3:
          "url('https://www.zoho.com/inventory/images/app-dashboard-1x.png')",
        ad1: "url('https://cdn.w600.comps.canstockphoto.com/poster-design-for-sale-event-in-simple-illustration_csp52613321.jpg')",
        ad2: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSA-qfBD3nnyj7d9P3C0Tej1hnCPXytKTl-wl9c3_WFxvnOQVjvA3ugzbKH4-6WDJbUMg&usqp=CAU')",
        ad3: "url('https://pub-static.fotor.com/assets/projects/pages/96acc39b4ac2450ca59e7487372e3cb7/600w/red-and-blue-headphone-sales-facebook-app-ad-3166c7d7c1b64ad7aa6f65606e05f234.jpg')",
      },
    },
  },
  plugins: [],
};
