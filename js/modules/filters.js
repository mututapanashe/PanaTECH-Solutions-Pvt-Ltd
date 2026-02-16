// filters.js - Portfolio and Blog Filter Functionality
export class Filters {
    constructor() {
        this.init();
    }
    
    init() {
        this.initPortfolioButtonFilters();
        this.initPortfolioFilters();
        this.initBlogFilters();
    }
    
    // Portfolio Button Filters (for portfolio page)
    initPortfolioButtonFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        if (!filterBtns.length) return;
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter portfolio items
                const filter = btn.dataset.filter;
                const cards = document.querySelectorAll('.portfolio-card');
                
                cards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Portfolio Filters
    initPortfolioFilters() {
        const categorySelect = document.getElementById('portfolioCategory');
        const sortSelect = document.getElementById('portfolioSort');
        
        if (!categorySelect || !sortSelect) return;
        
        // Add event listeners
        categorySelect.addEventListener('change', () => this.filterPortfolio());
        sortSelect.addEventListener('change', () => this.filterPortfolio());
        
        // Mark as active when changed
        categorySelect.addEventListener('change', () => {
            if (categorySelect.value !== 'all') {
                categorySelect.classList.add('active');
            }
        });
        
        sortSelect.addEventListener('change', () => {
            if (sortSelect.value !== 'latest') {
                sortSelect.classList.add('active');
            }
        });
    }
    
    filterPortfolio() {
        const categorySelect = document.getElementById('portfolioCategory');
        const sortSelect = document.getElementById('portfolioSort');
        const cards = document.querySelectorAll('.portfolio-card');
        
        const selectedCategory = categorySelect.value;
        const selectedSort = sortSelect.value;
        
        // Filter cards
        let visibleCards = [];
        cards.forEach(card => {
            const tag = card.querySelector('.portfolio-tag');
            const categoryMap = {
                'web': 'Web Development',
                'mobile': 'Mobile App',
                'software': 'Custom Software',
                'ai': 'AI & Automation',
                'cloud': 'Cloud Solutions'
            };
            
            if (selectedCategory === 'all' || tag.textContent === categoryMap[selectedCategory]) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
                visibleCards.push(card);
            } else {
                card.style.display = 'none';
            }
        });
        
        // Sort cards (client-side sorting)
        if (selectedSort !== 'latest') {
            this.sortCards(visibleCards, selectedSort);
        }
        
        // Show no results message if needed
        this.showNoResults(visibleCards, 'portfolio');
    }
    
    // Blog Filters
    initBlogFilters() {
        const categorySelect = document.getElementById('blogCategory');
        const sortSelect = document.getElementById('blogSort');
        
        if (!categorySelect || !sortSelect) return;
        
        // Add event listeners
        categorySelect.addEventListener('change', () => this.filterBlog());
        sortSelect.addEventListener('change', () => this.filterBlog());
        
        // Mark as active when changed
        categorySelect.addEventListener('change', () => {
            if (categorySelect.value !== 'all') {
                categorySelect.classList.add('active');
            }
        });
        
        sortSelect.addEventListener('change', () => {
            if (sortSelect.value !== 'latest') {
                sortSelect.classList.add('active');
            }
        });
    }
    
    filterBlog() {
        const categorySelect = document.getElementById('blogCategory');
        const sortSelect = document.getElementById('blogSort');
        const articles = document.querySelectorAll('.blog-card');
        
        const selectedCategory = categorySelect.value;
        const selectedSort = sortSelect.value;
        
        // Filter articles
        let visibleArticles = [];
        articles.forEach(article => {
            const categorySpan = article.querySelector('.blog-category');
            const categoryMap = {
                'web-dev': 'Web Development',
                'ai': 'AI & Automation',
                'mobile': 'Mobile Development',
                'cloud': 'Cloud Solutions',
                'security': 'Cybersecurity'
            };
            
            if (selectedCategory === 'all' || categorySpan.textContent === categoryMap[selectedCategory]) {
                article.style.display = 'block';
                article.style.animation = 'fadeIn 0.5s ease';
                visibleArticles.push(article);
            } else {
                article.style.display = 'none';
            }
        });
        
        // Sort articles
        if (selectedSort !== 'latest') {
            this.sortArticles(visibleArticles, selectedSort);
        }
        
        // Show no results message if needed
        this.showNoResults(visibleArticles, 'blog');
    }
    
    // Sort portfolio cards
    sortCards(cards, sortType) {
        // Implementation would depend on data attributes
        // For now, we'll just reverse the order for non-latest sorts
        switch(sortType) {
            case 'oldest':
                cards.reverse();
                break;
            case 'complexity':
                // Would need data-complexity attributes
                cards.sort((a, b) => {
                    const complexityA = parseInt(a.dataset.complexity) || 0;
                    const complexityB = parseInt(b.dataset.complexity) || 0;
                    return complexityB - complexityA;
                });
                break;
            case 'client-impact':
                // Would need data-impact attributes
                cards.sort((a, b) => {
                    const impactA = parseInt(a.dataset.impact) || 0;
                    const impactB = parseInt(b.dataset.impact) || 0;
                    return impactB - impactA;
                });
                break;
        }
    }
    
    // Sort blog articles
    sortArticles(articles, sortType) {
        switch(sortType) {
            case 'oldest':
                articles.reverse();
                break;
            case 'popular':
                // Would need data-views or data-popular attributes
                articles.sort((a, b) => {
                    const viewsA = parseInt(a.dataset.views) || 0;
                    const viewsB = parseInt(b.dataset.views) || 0;
                    return viewsB - viewsA;
                });
                break;
            case 'trending':
                // Would need data-trending attributes
                articles.sort((a, b) => {
                    const trendingA = parseInt(a.dataset.trending) || 0;
                    const trendingB = parseInt(b.dataset.trending) || 0;
                    return trendingB - trendingA;
                });
                break;
        }
    }
    
    // Show no results message
    showNoResults(visibleItems, type) {
        const grid = type === 'portfolio' 
            ? document.querySelector('.portfolio-grid')
            : document.querySelector('.blog-grid');
        
        let noResultsDiv = grid.querySelector('.no-results');
        
        if (visibleItems.length === 0) {
            if (!noResultsDiv) {
                noResultsDiv = document.createElement('div');
                noResultsDiv.className = 'no-results';
                noResultsDiv.innerHTML = `
                    <div class="no-results-icon">📭</div>
                    <h3>No results found</h3>
                    <p>Try adjusting your filters to see more content.</p>
                `;
                grid.appendChild(noResultsDiv);
            }
            noResultsDiv.style.display = 'block';
        } else {
            if (noResultsDiv) {
                noResultsDiv.style.display = 'none';
            }
        }
    }
}

// CSS for fade-in animation (add to stylesheet)
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.98);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);
