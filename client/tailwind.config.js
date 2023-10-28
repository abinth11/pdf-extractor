/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {   
      colors: {  
        primary: "#E5322D",
        secondary:"#BD060A",
        link:"#2872fa",
        danger: "#FF6C6C",
        light_shade:'#F4F6F9',
        light_black:'#2A3B4F',
        h_light:'#EAF0F6',
        bg_light:'#F8F9FA',
        txt_dim:'#9E9DA4'
      },    
      backgroundImage: {
        'authentication-background': "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1440 320\"%3E%3Cpath fill=\"%23E5322D\" fill-opacity=\"1\" d=\"M0,32L24,48C48,64,96,96,144,138.7C192,181,240,235,288,245.3C336,256,384,224,432,192C480,160,528,128,576,122.7C624,117,672,139,720,149.3C768,160,816,160,864,170.7C912,181,960,203,1008,197.3C1056,192,1104,160,1152,138.7C1200,117,1248,107,1296,101.3C1344,96,1392,96,1416,96L1440,96L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z\"%3E%3C/path%3E%3C/svg%3E')"
      },   
      fontFamily: {
        primary: ['Roboto']
      },
    },  
  },
  plugins: [],
}