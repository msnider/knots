/*
 * knots
 * Copyright 2018 data.world, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the
 * License.
 *
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * permissions and limitations under the License.
 *
 * This product includes software developed at
 * data.world, Inc.(http://data.world/).
 */

const importAll = (r) => {
  const images = {};
  const storeItem = (item) => {
    images[item.replace('./', '')] = r(item);
  };

  r.keys().map(storeItem);
  return images;
};

// require.context does not work with tests
// https://github.com/facebook/create-react-app/issues/517
let images = {};
if (process.env.NODE_ENV === 'test') {
  images = {
    'knots.svg': 'knots',
    'tap-postgres.svg': 'postgres',
    'tap-redshift.svg': 'redshift',
    'tap-salesforce.svg': 'salesforce',
    'target-datadotworld.svg': 'datadotworld',
    'target-stitch.svg': 'stitch'
  };
} else {
  images = importAll(require.context('./img', false, /\.svg$/));
}

export default (logo) => images[`${logo}.svg`];
