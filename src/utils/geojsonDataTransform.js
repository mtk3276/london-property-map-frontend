const tranformGeojsonForLeaflet = (regionBoundariesData) => {
    const formatter = new Intl.NumberFormat('en-GB');

    const transformedData = regionBoundariesData.map((item) => ({
        type: 'Feature',
        properties: {
          id: item.fid,
          name: item.name,
          price_paid: formatter.format(item.average_price_paid),
          num_properties: item.transaction_count,
          bin: item.price_bin,
        },
        geometry: item.geometry, // Use the existing geometry here
    }));

    return {
        type: 'FeatureCollection',
        features: transformedData,
    };
};

export { tranformGeojsonForLeaflet };