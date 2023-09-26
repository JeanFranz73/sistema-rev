import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
    state: () => ({
        availableThemes: ['light', 'dark'],
        theme: '',
        debugMode: true,
    }),
    getters: {
        isDarkTheme: (state) => state.theme === 'dark',
        getTheme: (state) => state.theme,
        isDebugMode: (state) => state.debugMode,
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