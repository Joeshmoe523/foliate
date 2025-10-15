// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "flowbite"

// Re-initialize Flowbite components after Turbo navigation
document.addEventListener('turbo:load', function() {
  // Re-initialize Flowbite components
  if (window.initFlowbite) {
    window.initFlowbite()
  }
})

document.addEventListener('turbo:before-cache', function() {
  // Clean up Flowbite components before caching
  if (window.Dropdown) {
    // Destroy all dropdown instances
    const dropdowns = document.querySelectorAll('[data-dropdown-toggle]')
    dropdowns.forEach(dropdown => {
      const dropdownInstance = window.Dropdown.getInstance(dropdown)
      if (dropdownInstance) {
        dropdownInstance.destroy()
      }
    })
  }
  
  if (window.Popover) {
    // Destroy all popover instances
    const popovers = document.querySelectorAll('[data-popover-target]')
    popovers.forEach(popover => {
      const popoverInstance = window.Popover.getInstance(popover)
      if (popoverInstance) {
        popoverInstance.destroy()
      }
    })
  }
})
