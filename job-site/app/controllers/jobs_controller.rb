class JobsController < ApplicationController
	require 'open-uri'
	require 'json'

	def index
		# Search form. 
	end

	def search
		# @jobs = JSON.parse(open("http://yagajobs.co.uk/api/vacancies.json/search?#{parameterize(params)}").read)
		get_places_near params["home"]

		params.delete("utf8")
		params.delete("commit")
		params["location"] = params["home"] unless params["location"]
		params["api_key"] = "9ef095b57dc3e3eb7449bfcffbc01b54"

		@jobs = JSON.parse(open(Rails.root+"public/search.json").read)
		@jobs.each do |job|
			correct_salary job
		end

		respond_to do |format|
			format.json do 
				render json: @jobs.to_json
			end
			format.html
		end
	end

	def show
		session[:last_job_page] = request.env['HTTP_REFERER'] || jobs_url
		@job = JSON.parse(open(Rails.root+"public/search.json").read).first
		@job["description"] = @job["description"].gsub("\n","<br>").html_safe
		# JSON.parse(open("http://yagajobs.co.uk/api/vacancies.json/#{params[:id]}?api_key=9ef095b57dc3e3eb7449bfcffbc01b54").read)
	end

	private 
	def parameterize params
		params.collect { |k,v| "#{k}=#{CGI::escape(v.to_s)}" }.join('&')
	end

	def get_places_near place
		box = Geocoder::Calculations.bounding_box(Geocoder.coordinates(place), 10)
		params = {username: "jubjubbird01", north: box[2], south: box[0], east: box[3], west: box[1]}
		@places = JSON.parse(open("http://api.geonames.org/citiesJSON?#{parameterize(params)}").read)
		p @places
	end

	def correct_salary job
		if job["salaryMinYearly"].try{ |s| s > 11000}
			job["salaryMinMonthly"] = job["salaryMinYearly"] / 12
			job["salaryMaxMonthly"] = job["salaryMaxYearly"] / 12
		else
			job["salaryMinHourly"] = job["salaryMinYearly"]
			job["salaryMaxHourly"] = job["salaryMaxYearly"]
			if job["hours"].try{|h| h.downcase.include? "full"}
				job["salaryMinMonthly"] = job["salaryMinHourly"].to_i*(37*365/7)/12
				job["salaryMaxMonthly"] = job["salaryMaxHourly"].to_i*(37*365/7)/12
			end
		end
	end
end
