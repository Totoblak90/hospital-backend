const getMenuFrontEnd = (role) => {
    const menu = [
        {
          title: 'Dashboard',
          icon: 'mdi mdi-gauge',
          quantity: null,
          subMenu: [
            { title: 'Home', url: '/' },
            { title: 'Progress-bar', url: '/dashboard/progress'},
            { title: 'Graphics', url: '/dashboard/graphic1'},
            { title: 'Promises', url: '/dashboard/promises' },
            { title: 'Observables', url: '/dashboard/observables' }
          ]
        },
    
        {
          title: 'Mantainance',
          icon: 'mdi mdi-folder-lock-open',
          quantity: null,
          subMenu: [
            // { title: 'Users', url: '/dashboard/users' },
            { title: 'Doctors', url: '/dashboard/doctors'},
            { title: 'Hospitals', url: '/dashboard/hospitals'}
          ]
        }
      ]

      if (role === 'ADMIN_ROLE') {
          menu[1].subMenu.unshift({ title: 'Users', url: '/dashboard/users' })
      }

      return menu
}

module.exports = {
    getMenuFrontEnd
}