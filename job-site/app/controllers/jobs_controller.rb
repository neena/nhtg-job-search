class JobsController < ApplicationController
	require 'open-uri'
	require 'json'

	def index
		# Search form. 
	end

	def search
		# @jobs = JSON.parse(open("http://yagajobs.co.uk/api/vacancies.json/search?#{parameterize(params)}").read)
		@jobs = JSON.parse(open(Rails.root+"public/search.json").read)
		@jobs.each do |job|
			if job["salaryMinYearly"].try{ |s| s > 1000}
				job["salaryMinMonthly"] = job["salaryMinYearly"] / 12
				job["salaryMaxMonthly"] = job["salaryMaxYearly"] / 12
			else
				job["salaryMinHourly"] = job["salaryMinYearly"]
				job["salaryMaxHourly"] = job["salaryMaxYearly"]
				if job["hours"].try{|h| h.downcase.include? "full"}
					job["salaryMinMonthly"] = job["salaryMinHourly"].to_i*70
					job["salaryMaxMonthly"] = job["salaryMaxHourly"].to_i*70
				end
			end
			job["description"] = job["description"].html_safe
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
		params.delete("utf8")
		params.delete("commit")
		params["location"] = params["home"] unless params["location"]
		params.delete("home")
		params["api_key"] = "9ef095b57dc3e3eb7449bfcffbc01b54"
		params.collect { |k,v| "#{k}=#{CGI::escape(v.to_s)}" }.join('&')
	end
end
