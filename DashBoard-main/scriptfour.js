const tooltip = document.getElementById('tooltip');
        const dots = document.querySelectorAll('.dot, .line-tooltip');

        dots.forEach(dot => {
            dot.addEventListener('mouseover', function() {
                tooltip.innerText = dot.getAttribute('data-tooltip');
                tooltip.style.display = 'block';
                const rect = dot.getBoundingClientRect();
                tooltip.style.top = `${rect.top - 10}px`;
                tooltip.style.left = `${rect.left + rect.width / 2}px`;
            });

            dot.addEventListener('mouseout', function() {
                tooltip.style.display = 'none';
            });
        });