const Band = require('../models/Band');

// GET todas as bandas
exports.getAllBands = async (req, res) => {
  try {
    const bands = await Band.find().sort({ popularity: -1 });
    res.json({
      success: true,
      count: bands.length,
      data: bands
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar bandas',
      error: error.message
    });
  }
};

// GET banda por ID
exports.getBandById = async (req, res) => {
  try {
    const band = await Band.findById(req.params.id);
    
    if (!band) {
      return res.status(404).json({
        success: false,
        message: 'Banda não encontrada'
      });
    }

    res.json({
      success: true,
      data: band
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar banda',
      error: error.message
    });
  }
};

// POST criar nova banda
exports.createBand = async (req, res) => {
  try {
    const band = await Band.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Banda criada com sucesso!',
      data: band
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erro ao criar banda',
      error: error.message
    });
  }
};

// PUT atualizar banda
exports.updateBand = async (req, res) => {
  try {
    const band = await Band.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!band) {
      return res.status(404).json({
        success: false,
        message: 'Banda não encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Banda atualizada com sucesso!',
      data: band
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erro ao atualizar banda',
      error: error.message
    });
  }
};

// DELETE remover banda
exports.deleteBand = async (req, res) => {
  try {
    const band = await Band.findByIdAndDelete(req.params.id);

    if (!band) {
      return res.status(404).json({
        success: false,
        message: 'Banda não encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Banda removida com sucesso!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao remover banda',
      error: error.message
    });
  }
};

// GET bandas mais tocadas (para o gráfico de barras)
exports.getMostPlayedBands = async (req, res) => {
  try {
    const bands = await Band.find()
      .sort({ totalSongs: -1 })
      .limit(10)
      .select('name totalSongs genre');

    res.json({
      success: true,
      data: bands.map(band => ({
        band: band.name,
        Songs: band.totalSongs,
        genre: band.genre
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar bandas mais tocadas',
      error: error.message
    });
  }
};
