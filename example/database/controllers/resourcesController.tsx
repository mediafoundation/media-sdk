const Resource = require('./../models/resource');

const upsertResource = async (resource) => {
  try {
    const [instance, created] = await Resource.upsert(resource);
    return [instance, created];
  } catch (error) {
    throw error;
  }
};

const getResourceById = async (id) => {
  try {
    return await Resource.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const deleteResourceById = async (id) => {
  try {
    const resource = await Resource.findByPk(id);
    if (!resource) {
      return null;
    }
    await resource.destroy();
    return resource;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  upsertResource,
  getResourceById,
  deleteResourceById
};