import { mount } from '@vue/test-utils'
import LoginForm from '@/components/LoginForm.vue'

describe("LoginForm.vue", () => {

    it("Provjeri ima li labele za username", () => {
        const wrapper = mount(LoginForm)
        const username = wrapper.get('[data-test="username"]')
        expect(username.text()).toBe("Korisničko ime:")
    })


    it("Provjeri ima li labele za lozinku", () => {
        const wrapper = mount(LoginForm)
        const pwd = wrapper.get('[data-test="pwd"]')
        expect(pwd.text()).toBe("Lozinka:")
    })
    

    it("Provjera ima li forma login button na kojem pise 'Prijavi se'", () => {
        const wrapper = mount(LoginForm)
        const button = wrapper.find('button')
        expect(button.text()).toBe("Prijavi se")
    })

    it("Provjera prikazuje li se poruke greske ako ne postoji username ili ako password nije ispravan tj. ako je error neki string", () => {
        const wrapper = mount(LoginForm, {
            data(){
                return {
                    error: 'Neispravni kredencijali'
                }
            }
        })
        const p = wrapper.find('p')

        expect(p.text()).toBe('Neispravni kredencijali')
    })

    it("Ako je error prazan string onda se poruka ne bi trebala prikazivati", () => {
        const wrapper = mount(LoginForm, {
            data(){
                return {
                    error: ''
                }
            }
        })
        const p = wrapper.find('p')

        expect(p.exists()).toBe(false)
    })

})