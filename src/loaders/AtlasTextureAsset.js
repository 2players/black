/**
 * Texture Atlas asset responsible for loading Image file and corresponding Json
 * file.
 *
 * @cat loaders
 * @extends Asset
 */
/* @echo EXPORT */
class AtlasTextureAsset extends Asset {
  /**
   * Creates new AtlasTextureAsset instance.
   *
   * @param {string} name     Name of the asset.
   * @param {string} imageUrl Image URL.
   * @param {string} dataUrl  Json URL.
   */
  constructor(name, imageUrl, dataUrl) {
    super(name, imageUrl);

    /** @private @type {Image} */
    this.mImageElement = new Image();
    this.mImageElement.crossOrigin = 'anonymous';

    /** @private @type {JSONAsset} */
    this.dataAsset = new JSONAsset(name, dataUrl);
    this.dataAsset.on('complete', this.onJsonLoaded, this);
  }


  /**
   * @ignore
   * @private
   * @returns {void}
   */
  onJsonLoaded() {
    this.mImageElement.src = this.mUrl;
    this.mImageElement.onload = () => {
      this.onLoaded();
    }
  }

  /**
   * @inheritDoc
   */
  onLoaded() {
    const scale = 1 / Texture.getScaleFactorFromName(this.mUrl);
    this.mData = new AtlasTexture(this.mImageElement, /** @type {{meta: *, frames: Array<Object<Array<number>>>}} */ (this.dataAsset.data), scale);

    super.onLoaded();
  }

  /**
   * @inheritDoc
   */
  load() {
    this.dataAsset.load();
  }
}