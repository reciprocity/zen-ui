import { toggleAttribute } from '../helpers/helpers';

export const modalsService = {
  modals: [],
  lastZIndex: 100,

  makeTopmost(modal: HTMLZenModalElement): void {
    this.modals.push(modal);
    this.updateLayers(true);
  },
  modalClosed(modal: HTMLZenModalElement): void {
    this.modals = this.modals.filter(n => !n.isSameNode(modal));
    this.updateLayers();
    if (this.modals.length) {
      this.toggleDimmer(modal, false);
    }
  },
  toggleDimmer(modal: HTMLZenModalElement, show: boolean): void {
    toggleAttribute(modal, 'topmost', show ? 'true' : '');
    const dimmer = modal.shadowRoot.querySelector('.dimmer');
    toggleAttribute(dimmer, 'animate', show ? 'in-end' : 'in-start');
  },
  updateLayers(recalcZIndex: boolean): void {
    const setHighestZIndex = (modal: HTMLZenModalElement) => (modal.style.zIndex = (this.lastZIndex++).toString());

    this.modals.forEach((modal: HTMLZenModalElement) => {
      this.toggleDimmer(modal, false);
    });
    const topmost = this.modals[this.modals.length - 1];
    if (!topmost) return;
    if (recalcZIndex) {
      setHighestZIndex(topmost);
    }
    this.toggleDimmer(topmost, true);
  },
};
