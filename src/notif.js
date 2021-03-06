const Promise = require('bluebird')

window.OneSignal = window.OneSignal || []
window.OneSignal.push(function () {
  window.OneSignal.init({
    appId: '4e895f92-caef-477a-bc64-429d7e34acc5',
    notifyButton: {
      enable: false,
    },
  })
})

export const getStatus = () => {
  return new Promise((resolve, reject) => {
    window.OneSignal.push(async function () {
      const { isPushEnabled, isOptedOut } = await Promise.props({
        isPushEnabled: window.OneSignal.isPushNotificationsEnabled(),
        isOptedOut: window.OneSignal.isOptedOut(),
      })

      return resolve(isPushEnabled && !isOptedOut)
    })
  })
}

export const setStatus = (status) => {
  return new Promise((resolve, reject) => {
    window.OneSignal.push(async function () {
      if (!window.OneSignal.isPushNotificationsSupported()) {
        return resolve(false)
      }

      const { isPushEnabled, isOptedOut } = await Promise.props({
        isPushEnabled: window.OneSignal.isPushNotificationsEnabled(),
        isOptedOut: window.OneSignal.isOptedOut(),
      })

      console.log({ isPushEnabled, isOptedOut })

      if ((isOptedOut || isOptedOut) && status) {
        window.OneSignal.setSubscription(status)
        return resolve(status)
      }

      if (isPushEnabled) {
        window.OneSignal.setSubscription(false)
        return resolve(false)
      }

      if (isOptedOut) {
        window.OneSignal.setSubscription(true)
        return resolve(true)
      }

      window.OneSignal.registerForPushNotifications()
      return resolve(true)
    })
  })
}

export const switchStatus = () => setStatus()

export const onChange = (cb) => {
  window.OneSignal.push(function () {
    if (!window.OneSignal.isPushNotificationsSupported()) {
      return
    }
    window.OneSignal.on('subscriptionChange', cb)
  })
}
