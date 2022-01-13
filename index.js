const { Transformer } = require('@parcel/plugin');

module.exports = new Transformer({
  async transform({ asset, options: { env } }) {
    const code = await asset.getCode();

    const result = code.replace(/%(\w.*?)%/g, (match, envKey) =>
      env[envKey] === undefined ? match : env[envKey]
    );

    asset.setCode(result);
    return [asset];
  },
});
