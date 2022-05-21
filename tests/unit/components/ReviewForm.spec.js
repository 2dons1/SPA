import { mount } from '@vue/test-utils'
import ReviewForm from '@/components/ReviewForm.vue'

describe("ReviewForm.vue", () => {

    it("Provjeri ima li labele za naslov", () => {
        const wrapper = mount(ReviewForm)
        const naslov = wrapper.get('[data-test="naslov"]')
        expect(naslov.text()).toBe("Naslov:")
    })


    it("Provjeri ima li labele za iskustvo", () => {
        const wrapper = mount(ReviewForm)
        const iskustvo = wrapper.get('[data-test="iskustvo"]')
        expect(iskustvo.text()).toBe("Tvoje iskustvo:")
    })
    

    it("Provjera ima li forma review button na kojem pise 'Recenziraj'", () => {
        const wrapper = mount(ReviewForm)
        const button = wrapper.find('button')
        expect(button.text()).toBe("Recenziraj")
    })

})