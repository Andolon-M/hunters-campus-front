import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
// Components that are registered globaly.
const requireComponent = require.context(
    '~/components', true, /\.vue$/
)

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)

    const componentName = upperFirst(
        camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
    )
    Vue.component(componentName, componentConfig.default || componentConfig)
})
