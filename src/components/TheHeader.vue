<script setup>
import { ref } from 'vue';
import TheLanguageMenu from './TheLanguageMenu.vue';
import TheThemeToggle from './TheThemeToggle.vue';
import { useI18n } from 'vue-i18n'
const { locale } = useI18n();

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const links = [
  { name: 'Home', label: 'global.header.nav.links.home' },
  { name: 'Projects', label: 'global.header.nav.links.projects' },
  { name: 'Services', label: 'global.header.nav.links.services' },
  { name: 'About', label: 'global.header.nav.links.about' },
  { name: 'Contact', label: 'global.header.nav.links.contact' }
]
</script>

<template>
  <header>
    <div class="container">
      <router-link
        :to="{ name: 'Home', params: { locale: locale } }"
        :aria-label="$t('global.header.logoAlt')"
        class="header-logo"
      >
        <span class="logo">FlorianSalvi<span class="dot">.</span></span>
      </router-link>
      <div class="header-right">
        <nav :aria-label="$t('global.header.nav.navAlt')" :class="{ 'menu-open': isMenuOpen }">
          <ul class="menu">
            <li>
              <router-link
                :to="{ name: 'Home', params: { locale: locale } }"
                :aria-current="$route.name === 'Home' ? 'page' : null"
                :class="{ active: $route.name === 'Home' }"
                @click="closeMenu"
              >
                {{ $t('global.header.nav.links.home') }}
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'Projects', params: { locale: locale } }"
                :aria-current="$route.name === 'Projects' ? 'page' : null"
                :class="{ active: $route.name === 'Projects' }"
                @click="closeMenu"
              >
                {{ $t('global.header.nav.links.projects') }}
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'Services', params: { locale: locale } }"
                :aria-current="$route.name === 'Services' ? 'page' : null"
                :class="{ active: $route.name === 'Services' }"
                @click="closeMenu"
              >
                {{ $t('global.header.nav.links.services') }}
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'About', params: { locale: locale } }"
                :aria-current="$route.name === 'About' ? 'page' : null"
                :class="{ active: $route.name === 'About' }"
                @click="closeMenu"
              >
                {{ $t('global.header.nav.links.about') }}
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'Contact', params: { locale: locale } }"
                :aria-current="$route.name === 'Contact' ? 'page' : null"
                :class="{ active: $route.name === 'Contact' }"
                @click="closeMenu"
              >
                {{ $t('global.header.nav.links.contact') }}
              </router-link>
            </li>
          </ul>
          <div class="menu-options-mobile">
            <TheThemeToggle/>
            <TheLanguageMenu/>
          </div>
        </nav>
        <div class="menu-options">
          <TheThemeToggle/>
          <TheLanguageMenu/>
        </div>
        <button 
          class="burger-button" 
          :class="{ 'open': isMenuOpen }"
          @click="toggleMenu"
          :aria-label="isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
          :aria-expanded="isMenuOpen"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  height: var(--size-header);
  display: flex;
  position: sticky;
  top: 0;
  z-index: var(--z-index-dropdown);
  background-color: var(--color-bg);
  transition:
        var(--transition-color),
        var(--transition-background-color);

  & .container {
    margin: auto;
    display: flex;
  }
}

.header-right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
}

.menu {
  display: flex;
  gap: var(--spacing-xl);

  & li {
    position: relative;
  }

  & a {
    color: var(--color-txt-muted);
  }

  & a:hover {
    color: var(--color-txt);
  }
}

.menu a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 2px;
  width: 0;
  height: 1px;
  background-color: var(--color-txt);
  transition: var(--transition-width);
}

.menu a.active {
  color: var(--color-txt);
}

.menu a:hover {
  color: var(--color-accent);
}

.menu a.active::after {
  width: 100%;
}

.menu a:hover::after {
  width: 100%;
  background-color: var(--color-accent);
}

.logo {
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-medium);
  color: var(--color-txt);

  & .dot {
    color: var(--color-accent);
  }
}

.menu-options {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-m);
}

.menu-options-mobile {
  display: none;
}

.burger-button {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: calc(var(--z-index-dropdown) + 2);

  & span {
    width: 100%;
    height: 2px;
    background-color: var(--color-txt);
    border-radius: var(--radius-full);
    transition: all 0.3s ease;
    transform-origin: left center;
  }
}

/* Animation burger vers croix */
.burger-button.open span:nth-child(1) {
  transform: rotate(45deg);
}

.burger-button.open span:nth-child(2) {
  opacity: 0;
}

.burger-button.open span:nth-child(3) {
  transform: rotate(-45deg);
}

/* Media query pour écrans < 1024px */
@media (max-width: 1023px) {
  .burger-button {
    display: flex;
  }

  .menu-options {
    display: none;
  }

  .menu-options-mobile {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-m);
    padding: var(--spacing-xl) 0;
    border-top: 1px solid var(--color-txt-muted);
    margin-top: var(--spacing-l);
  }

  nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background-color: var(--color-bg);
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    z-index: calc(var(--z-index-dropdown) + 1);
  }

  nav.menu-open {
    right: 0;
  }

  .menu {
    flex-direction: column;
    padding: 80px 30px 30px;
    gap: var(--spacing-l);
  }

  .menu a::after {
    display: none;
  }

  .menu a {
    font-size: var(--font-size-h4);
  }
}
</style>