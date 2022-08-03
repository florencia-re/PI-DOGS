require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//traigo la data de la api
const getApiInfo = async () => {
  const getInfo = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const dogsApi = getInfo.data.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      heightMin: dog.height.metric.split(" - ")[0],
      // tomo el indice cero y le realizo una aproximación
      heightMax: dog.height.metric.split(" - ")[1]
        ? dog.height.metric.split(" - ")[1]
        : Math.round(dog.height.metric.split(" - ")[0] * 1.1).toString(),
      weightMin:
        dog.weight.metric.split(" - ")[0] !== "NaN"
          ? dog.weight.metric.split(" - ")[0]
          : dog.weight.metric.split(" - ")[1]
          ? Math.round(dog.weight.metric.split(" - ")[1] * 0.6).toString()
          : "30",
      weightMax: dog.weight.metric.split(" - ")[1]
        ? dog.weight.metric.split(" - ")[1]
        : "39",
      temperaments: dog.temperament || "Unknown",
      lifeSpan: dog.life_span,
      image: dog.image.url,
    };
  });
  return dogsApi;
};

//traigo la data de la db
const getDbInfo = async () => {
  const dbInfo = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  // console.log(dbInfo)
  return dbInfo;
  
};


const getAllDogs = async () => {
  const infoApi = await getApiInfo();
  const infoDb = await getDbInfo();
  //pulo la info de la db, para q los temperamentos me lleguen como 
  // string y no como array de objetos
  const DogsDB = infoDb.map((e) => {
    return {
      id: e.id,
      name: e.name,
      heightMin: e.heightMin,
      heightMax: e.heightMax,
      weightMin: e.weightMin,
      weightMax: e.weightMax,
      temperaments: e.temperaments.map((e) => e.name).join(", "),
      lifeSpan: e.lifeSpan,
      image: e.image,
      createdInDb: e.createdInDb,
    };
  });
  const allDogs = infoApi.concat(DogsDB);
  return allDogs;
};

router.get("/dogs", async (req, res, next) => {
  // condicional si me mandan el 'name'
  try {
    const name = req.query.name;
    let allInfo = await getAllDogs();
    //console.log(allInfo)
    if (name) {
      let dogName = await allInfo.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      dogName.length
        ? res.status(200).json(dogName)
        : res.status(404).json("No se encontró el perro buscado");
    } else {
      res.status(200).json(allInfo);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/dogs/:id", async (req, res, next) => {
  const id = req.params.id;
  let allInfo = await getAllDogs();
  if (id) {
    let findId = await allInfo.find((dogId) => dogId.id == id);
    findId
      ? res.status(200).json(findId)
      : res.status(404).json(`${id} no es un ID válido`);
  }
});

router.post("/dogs", async (req, res, next) => {
  try {
    const {
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      temperaments,
      lifeSpan,
      image,
    } = req.body;
    if (
      !name ||
      !heightMin ||
      !heightMax ||
      !weightMin ||
      !weightMax ||
      !temperaments ||
      !lifeSpan
    ) {
      res.status(400).json("Faltan datos");
    } else {
      let newDog = await Dog.create({
        // puedo poner solo la propiedad por ecma6
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        lifeSpan: lifeSpan + " years",
        image,
      });
      //let maptemp = temperaments.map(el => el.name).join()
      let addTemperamento = await Temperament.findAll({
        where: { name: temperaments },
      });
      console.log(addTemperamento);
      newDog.addTemperament(addTemperamento);
      res.status(200).json(newDog);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/temperaments", async (req, res, next) => {
  try {
    const getApiTemperaments = await getAllDogs();
    // await axios.get(
    //   `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    // );
    let temperaments = getApiTemperaments.map(
      (results) => results.temperaments
    );
    //.toString();
    let temperamentsJoin = temperaments.join().split(",");
    let temperamentsTrim = temperamentsJoin.map((element) => element.trim());
    let newSet = [...new Set(temperamentsTrim)];
    //console.log(newSet);
    newSet.forEach((element) => {
      if (element !== "") {
        Temperament.findOrCreate({
          where: { name: element },
        });
      }
    });
    const allTemperaments = await Temperament.findAll();
    res.json(allTemperaments);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
