// const Promise = require('bluebird')

const OneSignal = window.OneSignal || []

export const setStatus = function (status) {
  console.log('coucou')
  OneSignal.push(async function () {
    console.log('1')
    if (!OneSignal.isPushNotificationsSupported()) {
      console.log('push not supported')
      return false
    }

    console.log('2')
    const isPushEnabled = await OneSignal.isPushNotificationsEnabled()
    const isOptedOut = await OneSignal.isOptedOut()

    if (isPushEnabled) {
      console.log('Subscribed, opt them out')
      return OneSignal.setSubscription(false)
    } else {
      if (isOptedOut) {
        console.log('Opted out, opt them back in')
        return OneSignal.setSubscription(true)
      } else {
        console.log('Unsubscribed, subscribe them')
        return OneSignal.registerForPushNotifications().then((a) => {
          console.log('in then', a)
          return OneSignal.setSubscription(true).then((b) => {
            console.log('in then', b)
          })
        })
      }
    }
  })
}
