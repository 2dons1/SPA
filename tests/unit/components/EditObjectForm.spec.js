import { mount } from '@vue/test-utils'
import EditObjectForm from '@/components/EditObjectForm.vue'

describe("EditObjectForm.vue", () => {
    // naziv, adresa, grad, telefon, radno, pogodnosti, vrsta
    it("Provjeri ima li labele za naziv", () => {
        const wrapper = mount(EditObjectForm)
        const naziv = wrapper.get('[data-test="naziv"]')
        expect(naziv.text()).toBe("Naziv:")
    })

    it("Provjeri ima li labele za adresa", () => {
        const wrapper = mount(EditObjectForm)
        const adresa = wrapper.get('[data-test="adresa"]')
        expect(adresa.text()).toBe("Adresa:")
    })

    it("Provjeri ima li labele za grad", () => {
        const wrapper = mount(EditObjectForm)
        const grad = wrapper.get('[data-test="grad"]')
        expect(grad.text()).toBe("Grad:")
    })

    it("Provjeri ima li labele za telefon", () => {
        const wrapper = mount(EditObjectForm)
        const telefon = wrapper.get('[data-test="telefon"]')
        expect(telefon.text()).toBe("Telefon:")
    })


    it("Provjeri ima li labele za radno", () => {
        const wrapper = mount(EditObjectForm)
        const radno = wrapper.get('[data-test="radno"]')
        expect(radno.text()).toBe("Radno vrijeme:")
    })

    it("Provjeri ima li labele za pogodnosti", () => {
        const wrapper = mount(EditObjectForm)
        const pogodnosti = wrapper.get('[data-test="pogodnosti"]')
        expect(pogodnosti.text()).toBe("Pogodnosti:")
    })

    it("Provjeri ima li labele za vrsta", () => {
        const wrapper = mount(EditObjectForm)
        const vrsta = wrapper.get('[data-test="vrsta"]')
        expect(vrsta.text()).toBe("Vrsta:")
    })
    

    it("Provjera ima li forma register button na kojem pise 'Dodaj'", () => {
        const wrapper = mount(EditObjectForm)
        const button = wrapper.find('button')
        expect(button.text()).toBe("Uredi")
    })

})