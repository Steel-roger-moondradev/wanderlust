// slider.js
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector(".types");
    const leftBtn = document.querySelector(".scroll-btn.left");
    const rightBtn = document.querySelector(".scroll-btn.right");
    
    if (!track || !leftBtn || !rightBtn) return;
    
    const scrollAmount = 400;
    
    // Function to check and hide/show scroll buttons
    function checkScrollButtons() {
        const maxScroll = track.scrollWidth - track.clientWidth;
        
        if (maxScroll <= 0) {
            leftBtn.style.display = 'none';
            rightBtn.style.display = 'none';
        } else {
            leftBtn.style.display = 'flex';
            rightBtn.style.display = 'flex';
            
            // Hide left button if at start
            if (track.scrollLeft <= 0) {
                leftBtn.style.opacity = '0.5';
                leftBtn.style.pointerEvents = 'none';
            } else {
                leftBtn.style.opacity = '1';
                leftBtn.style.pointerEvents = 'auto';
            }
            
            // Hide right button if at end
            if (track.scrollLeft >= maxScroll - 5) {
                rightBtn.style.opacity = '0.5';
                rightBtn.style.pointerEvents = 'none';
            } else {
                rightBtn.style.opacity = '1';
                rightBtn.style.pointerEvents = 'auto';
            }
        }
    }
    
    // Restore scroll position on page load
    const savedPosition = sessionStorage.getItem('categoryScrollPosition');
    if (savedPosition) {
        track.scrollLeft = parseInt(savedPosition);
    }
    
    // Check buttons after restoring position
    setTimeout(checkScrollButtons, 100);
    
    // Save scroll position before navigation
    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('click', function() {
            sessionStorage.setItem('categoryScrollPosition', track.scrollLeft);
        });
    });
    
    // Right button click
    rightBtn.onclick = () => {
        track.scrollLeft += scrollAmount;
        // Save position after manual scroll
        setTimeout(() => {
            sessionStorage.setItem('categoryScrollPosition', track.scrollLeft);
            checkScrollButtons();
        }, 300);
    };
    
    // Left button click
    leftBtn.onclick = () => {
        track.scrollLeft -= scrollAmount;
        // Save position after manual scroll
        setTimeout(() => {
            sessionStorage.setItem('categoryScrollPosition', track.scrollLeft);
            checkScrollButtons();
        }, 300);
    };
    
    // Save position on scroll
    track.addEventListener('scroll', () => {
        sessionStorage.setItem('categoryScrollPosition', track.scrollLeft);
        checkScrollButtons();
    });
    
    // Check buttons on window resize
    window.addEventListener('resize', checkScrollButtons);
    
    // Initial check
    checkScrollButtons();
});