import React, { useEffect, useState } from 'react';
import Cards from '../cards/Cards';
import Filter from '../filter/Filter';
import './Pets.css';
const Pets = () => {
  const [cats, setCats] = useState([]);
  const [original, setOriginal] = useState([]);
  const [options, setOptions] = useState({
    gender: 'Any',
    favoured: 'Any',
  });

  useEffect(() => {
    const fetchCats = async () => {
      const result = await fetch('http://localhost:4050/cats');
      const response = await result.json();
      setCats(response);
      setOriginal(response);
    };
    fetchCats();
  }, []);

  useEffect(() => {
    //any
    if (options.gender === 'Any' && options.favoured === 'Any') {
      setCats(original);
      return;
    } else if (options.gender === 'Any' && options.favoured === 'favoured') {
      setCats(original.filter(el => el.favoured === true));
      return;
    } else if (
      options.gender === 'Any' &&
      options.favoured === 'not favoured'
    ) {
      setCats(original.filter(el => el.favoured === false));
      return;
    }

    //male
    if (options.gender === 'male' && options.favoured === 'Any') {
      setCats(original.filter(el => el.gender === 'male'));
      return;
    } else if (options.gender === 'male' && options.favoured === 'favoured') {
      setCats(
        original.filter(el => el.favoured === true && el.gender === 'male')
      );
      return;
    } else if (
      options.gender === 'male' &&
      options.favoured === 'not favoured'
    ) {
      setCats(
        original.filter(el => el.favoured === false && el.gender === true)
      );
      return;
    }

    //female
    if (options.gender === 'female' && options.favoured === 'Any') {
      setCats(original.filter(el => el.gender === 'female'));
      return;
    } else if (options.gender === 'female' && options.favoured === 'favoured') {
      setCats(
        original.filter(el => el.favoured === true && el.gender === 'female')
      );
      return;
    } else if (
      options.gender === 'female' &&
      options.favoured === 'not favoured'
    ) {
      setCats(
        original.filter(el => el.favoured === false && el.gender === 'female')
      );
      return;
    }
  }, [options.gender, options.favoured, original]);

  const onSelectGenderCats = async gender => {
    setOptions({ ...options, gender: gender });
  };

  const onSelectFavoured = type => {
    setOptions({ ...options, favoured: type });
  };

  return (
    <div className="Pets">
      <Filter
        onSelectGenderCats={onSelectGenderCats}
        onSelectFavoured={onSelectFavoured}
      />
      <Cards cats={cats} original={original} setOriginal={setOriginal} />
    </div>
  );
};

export default Pets;
