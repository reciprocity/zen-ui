export const modalsService = {
  modals: [],
  lastZIndex: 100,

  makeTopmost(modal: HTMLZenModalElement): void {
    this.modals.push(modal);
    this.updateLayers();
  },
  modalClosed(modal: HTMLZenModalElement): void {
    this.modals = this.modals.filter(n => !n.isSameNode(modal));
    this.updateLayers();
  },
  updateLayers(): void {
    const setHighestZIndex = (modal: HTMLZenModalElement) => (modal.style.zIndex = (this.lastZIndex++).toString());
    const toggleDimmer = (modal: HTMLZenModalElement, show: boolean) =>
      show ? topmost.setAttribute('topmost', true) : modal.removeAttribute('topmost');

    this.modals.forEach((modal: HTMLZenModalElement) => {
      toggleDimmer(modal, false);
    });
    const topmost = this.modals[this.modals.length - 1];
    if (!topmost) return;
    setHighestZIndex(topmost);
    toggleDimmer(topmost, true);
  },
};
