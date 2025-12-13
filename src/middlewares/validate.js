function  validate(schema){

    return(req,res,next)=>{
        const {error,value}=schema.validate(req[property], {
            abortEarly: false,    
            allowUnknown: false,    
            stripUnknown: true    
          });

          if (error) {
            return res.status(422).json({
              message: "Validation failed",
              errors: error.details.map(err => ({
                field: err.path.join("."),
                message: err.message
              }))
            });
          }
      
          req[property] = value; 
          next();
        };
      };

export default validate