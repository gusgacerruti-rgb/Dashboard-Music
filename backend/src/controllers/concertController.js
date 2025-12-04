const Concert = require('../models/Concert');
const Band = require('../models/Band');

// GET todos os shows
exports.getAllConcerts = async (req, res) => {
  try {
    const concerts = await Concert.find()
      .populate('bandId', 'name genre')
      .sort({ date: 1 });

    res.json({
      success: true,
      count: concerts.length,
      data: concerts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar shows',
      error: error.message
    });
  }
};

// POST criar novo show
exports.createConcert = async (req, res) => {
  try {
    // Verifica se a banda existe
    const band = await Band.findById(req.body.bandId);
    if (!band) {
      return res.status(404).json({
        success: false,
        message: 'Banda não encontrada'
      });
    }

    const concert = await Concert.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Show criado com sucesso!',
      data: concert
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erro ao criar show',
      error: error.message
    });
  }
};

// DELETE remover show
exports.deleteConcert = async (req, res) => {
  try {
    const concert = await Concert.findByIdAndDelete(req.params.id);

    if (!concert) {
      return res.status(404).json({
        success: false,
        message: 'Show não encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Show removido com sucesso!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao remover show',
      error: error.message
    });
  }
};

// GET shows formatados para o FullCalendar
exports.getConcertsForCalendar = async (req, res) => {
  try {
    const concerts = await Concert.find()
      .populate('bandId', 'name')
      .select('title date bandId');

    const formattedConcerts = concerts.map(concert => ({
      id: concert._id,
      title: concert.bandId.name,
      date: concert.date.toISOString().split('T')[0]
    }));

    res.json({
      success: true,
      data: formattedConcerts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar shows para calendário',
      error: error.message
    });
  }
};
