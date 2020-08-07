class FlagsController < ActionController::API
    before_action :set_flag, only: [:show, :edit, :update, :destroy]
    def index
        flags = Flag.all.order("created_at DESC")
        render json: flags
      end
  
      def show
        render json: flag
      end

      def search
        flags = current_user.flags
        render json: flags
      end

      def owned
        flags = current_user.flags
        render json: flags
      end
  
      def create
        flag = current_user.flags.create(flag_params)
  
        if flag.save
          render json: flag
        else
          render json: flag.errors.full_messages
        end
      end
  
      def update
        flag = Flag.find(params[:id])
        if flag.update(flag_params)
          render json: flag
        else
          render json: flag.errors, status: :unprocessable_entity
        end
      end
  
      def destroy
        flag = Flag.find(params[:id])
        if flag.destroy
          render json: Flag.all
        end
      end
  
      private
        # Use callbacks to share common setup or constraints between actions.
        def set_flag
          flag = Flag.find(params[:id])
        end
  
        # Only allow a trusted parameter "white list" through.
        def flag_params
          params.require(:flag).permit(:expiration_date, :park_location, :gps_coordinates, :poi, :lic_plate, :address, :phone, :notes)
        end
end