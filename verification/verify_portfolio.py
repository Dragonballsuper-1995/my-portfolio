from playwright.sync_api import sync_playwright

def verify_portfolio():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Wait for server to start
            page.goto("http://localhost:5173")

            # Wait for loader to finish (simulated 2s)
            page.wait_for_timeout(3000)

            # Take screenshot of Hero section
            page.screenshot(path="verification/hero.png")
            print("Hero screenshot taken.")

            # Scroll down to Projects
            page.locator("#projects").scroll_into_view_if_needed()
            page.wait_for_timeout(1000)
            page.screenshot(path="verification/projects.png")
            print("Projects screenshot taken.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_portfolio()
