export const defaultSettings: App.AppSettings = {
  theme: 'light',
  themeColor: '#165DFF',
  tab: true,
  tabMode: 'card-gutter',
  animate: false,
  animateMode: 'zoom-fade',
  menuCollapse: false,
  menuAccordion: true,
  menuDark: false,
  copyrightDisplay: true,
  layout: 'mix',
  enableColorWeaknessMode: false,
  enableMourningMode: false,
}

export const getSettings = (): App.AppSettings => {
  return defaultSettings
}
