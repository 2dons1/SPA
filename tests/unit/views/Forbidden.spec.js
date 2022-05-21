import { mount } from '@vue/test-utils'
import Forbidden from '@/views/Forbidden.vue'

describe("Forbidden.vue", () => {
    it("Ispisuje poruku neautoriziranom korisniku", () => {
        const wrapper = mount(Forbidden)
        expect(wrapper.text()).toContain("You shall not pass.")
    })
})