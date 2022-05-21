import { shallowMount } from '@vue/test-utils'
import MyReviews from '@/views/MyReviews.vue'

describe("MyReviews.vue", () => {
    it("Provjera naslova", () => {
        const wrapper = shallowMount(MyReviews)
        expect(wrapper.text()).toContain("Moje recenzije")
    })

    it("Provjera sadrži li komponentu 'User Reviews'", () => {
        const wrapper = shallowMount(MyReviews)
        const user_reviews = wrapper.get('[data-test="user-reviews"]')
        expect(user_reviews.exists()).toBe(true)
    })
})