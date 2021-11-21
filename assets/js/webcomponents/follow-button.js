import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';

class FollowButton extends LitElement {
    static get properties() {
        return {
            followed: { type: Boolean },
            user: { type: String }
        };
    }

    constructor() {
        super();
        this.followed = false;
    }

    setFollowed(followed) {
        fetch(`${baseUrl}api/follow?user=${this.user}`);
        this.followed = followed;
    }

    render() {
        const { followed } = this;
        return html`
        <style>
            @import url('${baseUrl}assets/css/main.css?v=1.4-dev');
        </style>
        <button class="button is-primary is-outlined is-small" @click=${() => this.setFollowed(!followed)}>
            <i data-icon='${followed ? 'person_remove' : 'person_add'}'></i>
            ${followed ? 'Siguiendo' : 'Seguir'}
        </button>
      `;
    }
}

export default FollowButton;
