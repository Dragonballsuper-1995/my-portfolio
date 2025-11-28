from playwright.sync_api import sync_playwright, expect
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        # Navigate to the local preview server
        page.goto("http://localhost:4173")

        # Wait for loader to disappear
        # The loader has id "site-loader" and disappears after animation.
        # We can wait for it to detach or become hidden.
        # But since I implemented the loader in React to remove itself from DOM when done:
        # It's conditionally rendered: {loading && <Loader ... />}
        # So it should be detached.

        # Initial wait for React to hydrate
        page.wait_for_timeout(3000)

        # Check if Hero section is visible
        expect(page.locator("#hero")).to_be_visible()

        # Take a screenshot of the Hero section
        page.screenshot(path="verification/hero.png")
        print("Hero screenshot taken.")

        # Scroll to Projects
        page.locator("#projects").scroll_into_view_if_needed()
        time.sleep(1) # wait for animations
        page.screenshot(path="verification/projects.png")
        print("Projects screenshot taken.")

        # Toggle Theme
        # The toggle button id is "navbar-theme-toggle"
        page.click("#navbar-theme-toggle")
        time.sleep(1)
        page.screenshot(path="verification/light_mode.png")
        print("Light mode screenshot taken.")

        browser.close()

if __name__ == "__main__":
    run()
