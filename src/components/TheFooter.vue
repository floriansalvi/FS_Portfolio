<script setup>
import { useI18n } from 'vue-i18n'
const { locale } = useI18n();

</script>

<template>
  <footer>
    <div  class="container">
      <div class="full-width">
        <router-link
        :to="{ name: 'Home', params: { locale: locale } }"
        :aria-label="$t('global.footer.logoAlt')"
        class="footer-logo full-width"
      >
        <span class="logo">FlorianSalvi<span class="dot">.</span></span>
      </router-link>
      </div>
      <nav :aria-label="$t('global.footer.nav.navAlt')">
        <h4>{{ $t('global.footer.nav.title') }}</h4>
        <ul class="navigation">
          <li>
            <router-link
              :to="{ name: 'Home', params: { locale: locale } }"
              :aria-current="$route.name === 'Home' ? 'page' : null"
              :class="{ active: $route.name === 'Home' }"
            >
              {{ $t('global.footer.nav.links.home') }}
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'Projects', params: { locale: locale } }"
              :aria-current="$route.name === 'Projects' ? 'page' : null"
              :class="{ active: $route.name === 'Projects' }"
            >
              {{ $t('global.footer.nav.links.projects') }}
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'Services', params: { locale: locale } }"
              :aria-current="$route.name === 'Services' ? 'page' : null"
              :class="{ active: $route.name === 'Services' }"
            >
              {{ $t('global.footer.nav.links.services') }}
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'About', params: { locale: locale } }"
              :aria-current="$route.name === 'About' ? 'page' : null"
              :class="{ active: $route.name === 'About' }"
            >
              {{ $t('global.footer.nav.links.about') }}
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'Contact', params: { locale: locale } }"
              :aria-current="$route.name === 'Contact' ? 'page' : null"
              :class="{ active: $route.name === 'Contact' }"
            >
              {{ $t('global.footer.nav.links.contact') }}
            </router-link>
          </li>
      </ul>
      </nav>
      <nav :aria-label="$t('global.footer.socials.navAlt')">
        <h4>{{ $t('global.footer.socials.title') }}</h4>
        <ul>
          <li>
            <a :href="$t('global.footer.socials.links.linkedin.link')" target="_blank" rel="noopener" :aria-label="$t('global.footer.socials.links.linkedin.label')">
              {{ $t('global.footer.socials.links.linkedin.label') }}
            </a>
          </li>
          <li>
            <a :href="$t('global.footer.socials.links.github.link')" target="_blank" rel="noopener" :aria-label="$t('global.footer.socials.links.github.label')">
              {{ $t('global.footer.socials.links.github.label') }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <span class="small container full-width">{{ `© Florian Salvi ${ new Date().getFullYear() }` }}</span>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  gap: var(--spacing-m);
  flex-direction: column;
  position: relative;
  padding-block: var(--spacing-xl) var(--spacing-l);
  
  & .container {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-l);
    justify-content: space-between;
  }
  
  & a {
    position: relative;
    height: fit-content;
  }
  & a:hover {
    color: var(--color-txt);
  }
}

footer a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 2px;
  width: 0;
  height: 1px;
  background-color: var(--color-txt);
  transition: var(--transition-width);
}

footer a:hover::after {
  width: 100%;
  background-color: var(--color-txt);
}

.logo {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-medium);
  color: var(--color-txt);

  & .dot {
    color: var(--color-accent);
  }
}

h4 {
  margin-bottom: var(--spacing-xs);
}

@media (max-width: 768px) {
  footer .container{
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    & .full-width {
      grid-column: span 2;
    }
  }

  footer {
    gap: var(--spacing-l);
  }
}
</style>