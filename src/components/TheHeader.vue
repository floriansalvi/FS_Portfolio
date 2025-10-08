<script setup>
import TheLanguageMenu from './TheLanguageMenu.vue';
import TheThemeToggle from './TheThemeToggle.vue';
import { useI18n } from 'vue-i18n'
const { locale } = useI18n();

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
        <nav :aria-label="$t('global.header.nav.navAlt')">
          <ul class="menu">
            <li>
              <router-link
                :to="{ name: 'Home', params: { locale: locale } }"
                :aria-current="$route.name === 'Home' ? 'page' : null"
                :class="{ active: $route.name === 'Home' }"
              >
                {{ $t('global.header.nav.links.home') }}
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'Projects', params: { locale: locale } }"
                :aria-current="$route.name === 'Projects' ? 'page' : null"
                :class="{ active: $route.name === 'Projects' }"
              >
                {{ $t('global.header.nav.links.projects') }}
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'Services', params: { locale: locale } }"
                :aria-current="$route.name === 'Services' ? 'page' : null"
                :class="{ active: $route.name === 'Services' }"
              >
                {{ $t('global.header.nav.links.services') }}
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'About', params: { locale: locale } }"
                :aria-current="$route.name === 'About' ? 'page' : null"
                :class="{ active: $route.name === 'About' }"
              >
                {{ $t('global.header.nav.links.about') }}
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'Contact', params: { locale: locale } }"
                :aria-current="$route.name === 'Contact' ? 'page' : null"
                :class="{ active: $route.name === 'Contact' }"
              >
                {{ $t('global.header.nav.links.contact') }}
              </router-link>
            </li>
          </ul>
        </nav>
        <div class="menu-options">
          <TheThemeToggle/>
          <TheLanguageMenu/>
        </div>
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
  font-size: var(--font-size-h3);
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
</style>