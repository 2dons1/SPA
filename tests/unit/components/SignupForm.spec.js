import { mount } from '@vue/test-utils'
import SignupForm from '@/components/SignupForm.vue'

describe("SignupForm.vue", () => {

    it("Provjeri ima li labele za ime", () => {
        const wrapper = mount(SignupForm)
        const ime = wrapper.get('[data-test="ime"]')
        expect(ime.text()).toBe("Ime:")
    })

    it("Provjeri ima li labele za prezime", () => {
        const wrapper = mount(SignupForm)
        const prezime = wrapper.get('[data-test="prezime"]')
        expect(prezime.text()).toBe("Prezime:")
    })

    it("Provjeri ima li labele za username", () => {
        const wrapper = mount(SignupForm)
        const username = wrapper.get('[data-test="username"]')
        expect(username.text()).toBe("Username:")
    })

    it("Provjeri ima li labele za email", () => {
        const wrapper = mount(SignupForm)
        const email = wrapper.get('[data-test="email"]')
        expect(email.text()).toBe("Email:")
    })


    it("Provjeri ima li labele za lozinku", () => {
        const wrapper = mount(SignupForm)
        const pwd = wrapper.get('[data-test="pwd"]')
        expect(pwd.text()).toBe("Lozinka:")
    })

    it("Provjeri ima li labele za uloga", () => {
        const wrapper = mount(SignupForm)
        const uloga = wrapper.get('[data-test="uloga"]')
        expect(uloga.text()).toBe("Uloga:")
    })
    

    it("Provjera ima li forma register button na kojem pise 'Registriraj se'", () => {
        const wrapper = mount(SignupForm)
        const button = wrapper.find('button')
        expect(button.text()).toBe("Registriraj se")
    })

})