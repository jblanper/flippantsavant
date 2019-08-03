export default class LogoMenu {
    constructor (...logoMenuItems) {
        // elements
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

        const targetSectionId = event.currentTarget.id.split('-')[0]
        const newSelectedItem = this.menuItems[targetSectionId];

        if (this.selectedItem) {
            if (this.selectedItem.sectionName === newSelectedItem.sectionName) return;

            this.selectedItem.selected = false;
            this.selectedItem.handleMouseLeave();
        } 
        
        this.selectedItem = newSelectedItem;
        this.selectedItem.selected = true;
        
        window.cancelAnimationFrame(this.selectedItem.animationID);
        this.selectedItem.animationID = undefined;
        this.selectedItem.handleMouseEnter();
    }

    setAnimations () {
        Object.values(this.menuItems).forEach(item =>
            item.parent.addEventListener('click', this.handleClick.bind(this))
        );
    }
}