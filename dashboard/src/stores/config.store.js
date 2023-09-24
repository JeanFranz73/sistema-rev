import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
    state: () => ({
        availableThemes: ['light', 'dark'],
        theme: '',
    }),
    getters: {
        isDarkTheme: (state) => state.theme === 'dark',
        getTheme: (state) => state.theme,
    },
    actions: {
        fetch() {
            this.setTheme(localStorage.getItem('theme') || 'light')
        },
        setTheme(theme) {
            if (this.availableThemes.includes(theme)) {
                this.theme = theme
                localStorage.setItem('theme', theme)
                document.documentElement.classList.remove(...this.availableThemes)
                document.documentElement.classList.add(theme)
            }
        },
    }
})