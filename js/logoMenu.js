import { toggleElement, resetComicArticleVisibility } from './helper.js';

export default class LogoMenu {
    constructor (...logoMenuItems) {
        // elements
        this.homepageElem = document.querySelector('#homepage');
        this.header = document.querySelector('body > header');

        this.menuItems = {};
        logoMenuItems.forEach(item => this.menuItems[item.sectionName] = item);

        this.selectedItem = null;
    }

    reset () {
        if (this.selectedItem) {
            this.selectedItem.selected = false;
            this.selectedItem = null;
        }
        Object.values(this.menuItems).forEach(item => item.reset());

        // hide main logo/menu
        this.header.classList.toggle('to-left');
    }

    handleClick (event) {
        // hide header
        this.header.classList.toggle('to-left');

        // change sections
        const newSelectedItem = this.menuItems[event.target.id.split('-')[0]];
        
        if (this.selectedItem) {
            if (this.selectedItem.sectionName === newSelectedItem.sectionName) return;
            // for comic
            if (this.selectedItem.sectionName === 'comic') resetComicArticleVisibility();

            this.selectedItem.selected = false;
            this.selectedItem.handleMouseLeave();

            toggleElement(this.selectedItem.sectionElem);
        } else {
            toggleElement(this.homepageElem);
        }
        
        this.selectedItem = newSelectedItem;
        this.selectedItem.selected = true;
        
        window.cancelAnimationFrame(this.selectedItem.animationID);
        this.selectedItem.animationID = undefined;
        this.selectedItem.handleMouseEnter();

        toggleElement(this.selectedItem.sectionElem);
    }

    setAnimations () {
        Object.values(this.menuItems).forEach(item =>
            item.parent.addEventListener('click', this.handleClick.bind(this))
        );
    }
}