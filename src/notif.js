const Promise = require('bluebird')

window.OneSignal = window.OneSignal || []

export const setStatus = function (status) {
  console.log('coucou')
  window.OneSignal.push(function () {
    console.log('1')
    if (!window.OneSignal.isPushNotificationsSupported()) {
      console.log('push not supported')
      return false
    }

    console.log('Before promise')
    Promise.all([
      window.OneSignal.isPushNotificationsEnabled(),
      window.OneSignal.isOptedOut(),
    ]).then(function ([isPushEnabled, isOptedOut]) {
      console.log([isPushEnabled, isOptedOut])
      if (isPushEnabled) {
        console.log('Subscribed, opt them out')
        return window.OneSignal.setSubscription(false)
      } else {
        if (isOptedOut) {
          console.log('Opted out, opt them back in')
          return window.OneSignal.setSubscription(true)
        } else {
          console.log('Unsubscribed, subscribe them')
          return window.OneSignal.registerForPushNotifications().then((a) => {
            console.log('in then', a)
            return window.OneSignal.setSubscription(true).then((b) => {
              console.log('in then', b)
            })
          })
        }
      }
    })
  })
}
