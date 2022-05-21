import { mount } from '@vue/test-utils'
import EditReviewForm from '@/components/EditReviewForm.vue'

describe("EditReviewForm.vue", () => {

    it("Provjeri ima li labele za naslov", () => {
        const wrapper = mount(EditReviewForm)
        const naslov = wrapper.get('[data-test="naslov"]')
        expect(naslov.text()).toBe("Naslov:")
    })


    it("Provjeri ima li labele za iskustvo", () => {
        const wrapper = mount(EditReviewForm)
        const iskustvo = wrapper.get('[data-test="iskustvo"]')
        expect(iskustvo.text()).toBe("Tvoje iskustvo:")
    })
    

    it("Provjera ima li forma review button na kojem pise 'Recenziraj'", () => {
        const wrapper = mount(EditReviewForm)
        const button = wrapper.find('button')
        expect(button.text()).toBe("Uredi")
    })

})