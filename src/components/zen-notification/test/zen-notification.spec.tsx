import { newSpecPage } from '@stencil/core/testing';
import { ZenNotification } from '../zen-notification';

describe('zen-notification', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenNotification],
      html: `<zen-toast></zen-toast>`,
    });
    expect(page.root).toEqualHtml(`
     <zen-toast class="show">
        <mock:shadow-root>
         <div class="toast toast-success" style="width: 25rem; min-height: 5rem;">
           <div class="close close-success hide">
             <svg aria-hidden="true" class="fa-times fa-w-20 mr-3 svg-inline--fa" data-fa-i2svg data-icon="times" data-prefix="fal" focusable="false" role="img" viewBox="0 0 352 512" xmlns="http://www.w3.org/2000/svg">
               <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" fill="currentColor"></path>
             </svg>
           </div>
           <div class="row">
             <div class="icon-container">
               <div class="icon-success">
                 <svg aria-hidden="true" class="fa-check fa-w-20 mr-3 svg-inline--fa" data-fa-i2svg data-icon="check" data-prefix="fal" focusable="false" role="img" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" fill="currentColor"></path>
                 </svg>
               </div>
             </div>
             <div class="content-container">
               <div class="title"></div>
               <div class="message"></div>
             </div>
           </div>
         </div>
        </mock:shadow-root>
      </zen-toast>
    `);
  });
});
