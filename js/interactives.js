document.addEventListener('DOMContentLoaded', function() {
    const popup = document.createElement('div');
    popup.className = 'thumbnail-popup';
    document.body.appendChild(popup);

    // Select all links within the interactive list
    const links = document.querySelectorAll('.interactive-list a');

    links.forEach(link => {
        let iframe;

        link.addEventListener('mouseenter', function(e) {
            const href = this.getAttribute('href');
            
            // Only show popup if it's a link to an HTML file (interactive)
            if (href && href.endsWith('.html')) {
                // Clear previous content
                popup.innerHTML = '';
                
                // Create iframe
                iframe = document.createElement('iframe');
                iframe.src = href;
                iframe.setAttribute('scrolling', 'no'); // Disable scrolling on the preview
                
                popup.appendChild(iframe);
                popup.style.display = 'block';
            }
        });

        link.addEventListener('mousemove', function(e) {
            const offset = 15; // Distance from cursor
            
            // Calculate position
            let left = e.pageX + offset;
            let top = e.pageY + offset;

            // Check if popup goes off screen to the right
            if (left + popup.offsetWidth > window.innerWidth) {
                left = e.pageX - popup.offsetWidth - offset;
            }

            // Check if popup goes off screen to the bottom
            // Use innerHeight for viewport check instead of scrollHeight for better behavior
            if (e.clientY + offset + popup.offsetHeight > window.innerHeight) {
                top = e.pageY - popup.offsetHeight - offset;
            }

            popup.style.left = left + 'px';
            popup.style.top = top + 'px';
        });

        link.addEventListener('mouseleave', function() {
            popup.style.display = 'none';
            popup.innerHTML = ''; // Clear content to stop iframe loading/playing
        });
    });
});
