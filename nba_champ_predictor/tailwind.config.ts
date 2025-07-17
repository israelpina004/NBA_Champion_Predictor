const config = {
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        }
      }                    
    },
  },
}

module.exports = {
   theme: {
     extend: {
       keyframes: {
        appear: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
       },
       animation: {
          appear: "appear 1s ease-in-out",
       }
     }
    }
}