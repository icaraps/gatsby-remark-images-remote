const {
  DEFAULT_OPTIONS,
  imageClass,
  imageBackgroundClass,
  imageWrapperClass,
} = require(`./constants`)

exports.onRouteUpdate = (apiCallbackContext, pluginOptions) => {
  const options = Object.assign({}, DEFAULT_OPTIONS, pluginOptions)

  const imageWrappers = document.querySelectorAll(`.${imageWrapperClass}`)

  // https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/
  // for cross-browser looping through NodeList without polyfills
  for (let i = 0; i < imageWrappers.length; i++) {
    const imageWrapper = imageWrappers[i]

    const backgroundElement = imageWrapper.querySelector(
      `.${imageBackgroundClass}`
    )
    const imageElement = imageWrapper.querySelector(`.${imageClass}`)

    const onImageComplete = () => {
      backgroundElement.style.opacity = 0
      imageElement.style.opacity = 1
      imageElement.removeEventListener(`load`, onImageComplete)
      imageElement.removeEventListener(`error`, onImageComplete)
    }
    
    imageElement.addEventListener(`load`, onImageComplete)
    imageElement.addEventListener(`error`, onImageComplete)
    if (imageElement.complete) {
      onImageComplete()
    }
  }
}
